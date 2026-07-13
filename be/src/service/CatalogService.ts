import prisma from "../lib/prisma";
import { getUniqueCatalogSlug } from "../lib/slug";
import { deleteFromCloudinary } from "../lib/cloudinary";
import { AppError } from "../lib/AppError";

class CatalogService {
  public async getAll(query: any) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 10));
    const search = (query.search as string)?.trim();
    const categoryIdParam = query.categoryId as string;
    const isPublishedParam = query.isPublished as string;
    const isFeaturedParam = query.isFeatured as string;

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

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  public async getById(idOrSlug: string) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    const whereClause = isUuid ? { id: idOrSlug } : { slug: idOrSlug };

    const item = await prisma.catalogItem.findUnique({
      where: whereClause,
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
      throw new AppError("Catalog item not found", 404);
    }

    return item;
  }

  public async create(data: {
    title: string;
    description?: string | null;
    priceStart?: number | string | null;
    estimatedTime?: string | null;
    isFeatured?: boolean;
    isPublished?: boolean;
    categoryId?: number | string | null;
    slug?: string;
    images?: Array<any>;
  }) {
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
    } = data;

    const slug = await getUniqueCatalogSlug(customSlug || title);

    let parsedCategoryId: number | null = null;
    if (categoryId !== undefined && categoryId !== null && categoryId !== "") {
      const num = Number(categoryId);
      if (!isNaN(num)) {
        const catExists = await prisma.category.findUnique({ where: { id: num } });
        if (!catExists) {
          throw new AppError(`Category ID ${num} does not exist`, 400);
        }
        parsedCategoryId = num;
      }
    }

    return prisma.$transaction(async (tx) => {
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
        const hasPrimary = images.some((img) => img.isPrimary === true);

        await tx.catalogImage.createMany({
          data: images.map((img, idx) => ({
            catalogItemId: item.id,
            imageUrl: img.imageUrl,
            cloudinaryPublicId: img.cloudinaryPublicId,
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
  }

  public async update(
    id: string,
    data: {
      title?: string;
      description?: string | null;
      priceStart?: number | string | null;
      estimatedTime?: string | null;
      isFeatured?: boolean;
      isPublished?: boolean;
      categoryId?: number | string | null;
      slug?: string;
    }
  ) {
    const existingItem = await prisma.catalogItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      throw new AppError("Catalog item not found", 404);
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
    } = data;

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
            throw new AppError(`Category ID ${num} does not exist`, 400);
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

    return prisma.catalogItem.update({
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
  }

  public async delete(id: string) {
    const existingItem = await prisma.catalogItem.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!existingItem) {
      throw new AppError("Catalog item not found", 404);
    }

    if (existingItem.images && existingItem.images.length > 0) {
      for (const img of existingItem.images) {
        if (img.cloudinaryPublicId) {
          await deleteFromCloudinary(img.cloudinaryPublicId);
        }
      }
    }

    await prisma.catalogItem.delete({
      where: { id },
    });

    return true;
  }
}

export default new CatalogService();
