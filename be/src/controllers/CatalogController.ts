import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";
import { getUniqueCatalogSlug } from "../lib/slug";
import { deleteFromCloudinary } from "../lib/cloudinary";
import { sendSuccess, sendError } from "../lib/response";

const imageInputSchema = z.object({
  imageUrl: z.string().url("Invalid image URL"),
  cloudinaryPublicId: z.string().min(1, "Cloudinary public ID is required"),
  isPrimary: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

const createCatalogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title max 200 chars"),
  description: z.string().optional().nullable(),
  priceStart: z.union([z.number(), z.string()]).optional().nullable(),
  estimatedTime: z.string().max(50).optional().nullable(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  categoryId: z.union([z.number().int(), z.string()]).optional().nullable(),
  slug: z.string().optional(),
  images: z.array(imageInputSchema).optional(),
});

const updateCatalogSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional().nullable(),
  priceStart: z.union([z.number(), z.string()]).optional().nullable(),
  estimatedTime: z.string().max(50).optional().nullable(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  categoryId: z.union([z.number().int(), z.string()]).optional().nullable(),
  slug: z.string().optional(),
});

class CatalogController {
  /**
   * GET /api/admin/catalog
   * Get all catalog items with pagination, search by title, and filters.
   * Includes primary image and category details.
   */
  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 10));
      const search = (req.query.search as string)?.trim();
      const categoryIdParam = req.query.categoryId as string;
      const isPublishedParam = req.query.isPublished as string;
      const isFeaturedParam = req.query.isFeatured as string;

      const where: any = {};

      if (search) {
        where.title = {
          contains: search,
          mode: "insensitive",
        };
      }

      if (categoryIdParam && categoryIdParam !== "all" && !isNaN(Number(categoryIdParam))) {
        where.categoryId = Number(categoryIdParam);
      }

      if (isPublishedParam !== undefined && isPublishedParam !== "all" && isPublishedParam !== "") {
        where.isPublished = isPublishedParam === "true";
      }

      if (isFeaturedParam !== undefined && isFeaturedParam !== "all" && isFeaturedParam !== "") {
        where.isFeatured = isFeaturedParam === "true";
      }

      const [items, total] = await prisma.$transaction([
        prisma.catalogItem.findMany({
          where,
          include: {
            category: true,
            images: {
              orderBy: [
                { isPrimary: "desc" },
                { displayOrder: "asc" },
              ],
            },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.catalogItem.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      sendSuccess(res, items, "Catalog items fetched successfully", 200, {
        total,
        page,
        limit,
        totalPages,
      });
    } catch (error) {
      console.error("Get Catalog Items Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * GET /api/admin/catalog/:id
   * Get full details of a single item, including ALL associated images ordered by displayOrder ASC, and category details.
   */
  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;

      const item = await prisma.catalogItem.findUnique({
        where: { id },
        include: {
          category: true,
          images: {
            orderBy: [
              { isPrimary: "desc" },
              { displayOrder: "asc" },
            ],
          },
        },
      });

      if (!item) {
        sendError(res, "Catalog item not found", 404);
        return;
      }

      sendSuccess(res, item, "Catalog item details fetched successfully");
    } catch (error) {
      console.error("Get Catalog Item By ID Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * POST /api/admin/catalog
   * Create a new catalog item with optional initial array of images inside prisma.$transaction.
   */
  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = createCatalogSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const {
        title,
        description,
        priceStart,
        estimatedTime,
        isFeatured,
        isPublished,
        categoryId,
        slug: customSlug,
        images,
      } = validation.data;

      const slug = await getUniqueCatalogSlug(customSlug || title);

      let parsedCategoryId: number | null = null;
      if (categoryId !== undefined && categoryId !== null && categoryId !== "") {
        const num = Number(categoryId);
        if (!isNaN(num)) {
          // Check if category exists
          const catExists = await prisma.category.findUnique({ where: { id: num } });
          if (!catExists) {
            sendError(res, `Category ID ${num} does not exist`, 400);
            return;
          }
          parsedCategoryId = num;
        }
      }

      const createdItem = await prisma.$transaction(async (tx) => {
        const item = await tx.catalogItem.create({
          data: {
            title,
            slug,
            description: description ?? null,
            priceStart: priceStart !== undefined && priceStart !== null ? Number(priceStart) : null,
            estimatedTime: estimatedTime ?? null,
            isFeatured: isFeatured ?? false,
            isPublished: isPublished ?? true,
            categoryId: parsedCategoryId,
          },
        });

        if (images && images.length > 0) {
          // Check if any image explicitly requested isPrimary = true
          const hasPrimary = images.some((img) => img.isPrimary === true);

          await tx.catalogImage.createMany({
            data: images.map((img, idx) => ({
              catalogItemId: item.id,
              imageUrl: img.imageUrl,
              cloudinaryPublicId: img.cloudinaryPublicId,
              // If none specified as primary, default index 0 to true
              isPrimary: img.isPrimary !== undefined ? img.isPrimary : (!hasPrimary && idx === 0),
              displayOrder: img.displayOrder !== undefined ? img.displayOrder : idx,
            })),
          });
        }

        return tx.catalogItem.findUnique({
          where: { id: item.id },
          include: {
            category: true,
            images: {
              orderBy: [
                { isPrimary: "desc" },
                { displayOrder: "asc" },
              ],
            },
          },
        });
      });

      sendSuccess(res, createdItem, "Catalog item created successfully", 201);
    } catch (error) {
      console.error("Create Catalog Item Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * PUT /api/admin/catalog/:id
   * Update item details. Auto-update slug if title changes.
   */
  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;

      const existingItem = await prisma.catalogItem.findUnique({
        where: { id },
      });

      if (!existingItem) {
        sendError(res, "Catalog item not found", 404);
        return;
      }

      const validation = updateCatalogSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const {
        title,
        description,
        priceStart,
        estimatedTime,
        isFeatured,
        isPublished,
        categoryId,
        slug: customSlug,
      } = validation.data;

      let newSlug = existingItem.slug;
      if (customSlug) {
        newSlug = await getUniqueCatalogSlug(customSlug, id);
      } else if (title && title !== existingItem.title) {
        newSlug = await getUniqueCatalogSlug(title, id);
      }

      let parsedCategoryId: number | null | undefined = undefined;
      if (categoryId !== undefined) {
        if (categoryId === null || categoryId === "") {
          parsedCategoryId = null;
        } else {
          const num = Number(categoryId);
          if (!isNaN(num)) {
            const catExists = await prisma.category.findUnique({ where: { id: num } });
            if (!catExists) {
              sendError(res, `Category ID ${num} does not exist`, 400);
              return;
            }
            parsedCategoryId = num;
          } else {
            parsedCategoryId = null;
          }
        }
      }

      const updateData: any = {
        slug: newSlug,
      };

      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (priceStart !== undefined) updateData.priceStart = priceStart !== null ? Number(priceStart) : null;
      if (estimatedTime !== undefined) updateData.estimatedTime = estimatedTime;
      if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
      if (isPublished !== undefined) updateData.isPublished = isPublished;
      if (parsedCategoryId !== undefined) updateData.categoryId = parsedCategoryId;

      const updatedItem = await prisma.catalogItem.update({
        where: { id },
        data: updateData,
        include: {
          category: true,
          images: {
            orderBy: [
              { isPrimary: "desc" },
              { displayOrder: "asc" },
            ],
          },
        },
      });

      sendSuccess(res, updatedItem, "Catalog item updated successfully");
    } catch (error) {
      console.error("Update Catalog Item Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * DELETE /api/admin/catalog/:id
   * MUST fetch all related CatalogImage records first, delete them from Cloudinary via SDK, then delete the item from DB.
   */
  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;

      const existingItem = await prisma.catalogItem.findUnique({
        where: { id },
        include: {
          images: true,
        },
      });

      if (!existingItem) {
        sendError(res, "Catalog item not found", 404);
        return;
      }

      // 1. Delete all associated images from Cloudinary via Cloudinary SDK
      if (existingItem.images && existingItem.images.length > 0) {
        for (const img of existingItem.images) {
          if (img.cloudinaryPublicId) {
            await deleteFromCloudinary(img.cloudinaryPublicId);
          }
        }
      }

      // 2. Delete the item from Prisma database (cascade will clean up CatalogImage rows)
      await prisma.catalogItem.delete({
        where: { id },
      });

      sendSuccess(res, null, "Catalog item and all associated images deleted successfully");
    } catch (error) {
      console.error("Delete Catalog Item Error:", error);
      sendError(res, error, 500);
    }
  };
}

export default new CatalogController();
