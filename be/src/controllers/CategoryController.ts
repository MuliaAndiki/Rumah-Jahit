import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";
import { getUniqueCategorySlug } from "../lib/slug";
import { sendSuccess, sendError } from "../lib/response";

const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(100, "Category name max 100 chars"),
  slug: z.string().optional(),
});

const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name cannot be empty").max(100).optional(),
  slug: z.string().min(1, "Slug cannot be empty").max(120).optional(),
});

class CategoryController {
  /**
   * GET /api/admin/categories
   * Get all categories with a count of total catalog items in each category (_count).
   */
  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { catalogItems: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      sendSuccess(res, categories, "Categories retrieved successfully");
    } catch (error) {
      console.error("Get Categories Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * POST /api/admin/categories
   * Create a new category + auto-generate unique slug.
   */
  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = createCategorySchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const { name, slug: customSlug } = validation.data;

      // Auto-generate or verify slug
      const slug = await getUniqueCategorySlug(customSlug || name);

      const newCategory = await prisma.category.create({
        data: {
          name,
          slug,
        },
        include: {
          _count: {
            select: { catalogItems: true },
          },
        },
      });

      sendSuccess(res, newCategory, "Category created successfully", 201);
    } catch (error) {
      console.error("Create Category Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * PUT /api/admin/categories/:id
   * Update category name/slug.
   */
  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        sendError(res, "Invalid category ID", 400);
        return;
      }

      const validation = updateCategorySchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const existingCategory = await prisma.category.findUnique({
        where: { id },
      });

      if (!existingCategory) {
        sendError(res, "Category not found", 404);
        return;
      }

      const { name, slug: customSlug } = validation.data;
      let newSlug = existingCategory.slug;

      if (customSlug) {
        newSlug = await getUniqueCategorySlug(customSlug, id);
      } else if (name && name !== existingCategory.name) {
        newSlug = await getUniqueCategorySlug(name, id);
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: {
          name: name ?? existingCategory.name,
          slug: newSlug,
        },
        include: {
          _count: {
            select: { catalogItems: true },
          },
        },
      });

      sendSuccess(res, updatedCategory, "Category updated successfully");
    } catch (error) {
      console.error("Update Category Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * DELETE /api/admin/categories/:id
   * Delete category (Prisma onDelete: SetNull will handle setting item categoryIds to null).
   */
  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        sendError(res, "Invalid category ID", 400);
        return;
      }

      const existingCategory = await prisma.category.findUnique({
        where: { id },
      });

      if (!existingCategory) {
        sendError(res, "Category not found", 404);
        return;
      }

      await prisma.category.delete({
        where: { id },
      });

      sendSuccess(res, null, "Category deleted successfully");
    } catch (error) {
      console.error("Delete Category Error:", error);
      sendError(res, error, 500);
    }
  };
}

export default new CategoryController();
