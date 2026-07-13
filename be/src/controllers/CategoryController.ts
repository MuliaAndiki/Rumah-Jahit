import { Request, Response } from "express";
import { z } from "zod";
import { sendSuccess, sendError } from "../lib/response";
import CategoryService from "../service/CategoryService";

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
   * Delegate to CategoryService.getAll.
   */
  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await CategoryService.getAll();
      sendSuccess(res, categories, "Categories retrieved successfully");
    } catch (error) {
      console.error("Get Categories Error:", error);
      sendError(res, error);
    }
  };

  /**
   * POST /api/admin/categories
   * Validate and delegate to CategoryService.create.
   */
  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = createCategorySchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const newCategory = await CategoryService.create(validation.data);
      sendSuccess(res, newCategory, "Category created successfully", 201);
    } catch (error) {
      console.error("Create Category Error:", error);
      sendError(res, error);
    }
  };

  /**
   * PUT /api/admin/categories/:id
   * Validate and delegate to CategoryService.update.
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

      const updatedCategory = await CategoryService.update(id, validation.data);
      sendSuccess(res, updatedCategory, "Category updated successfully");
    } catch (error) {
      console.error("Update Category Error:", error);
      sendError(res, error);
    }
  };

  /**
   * DELETE /api/admin/categories/:id
   * Validate and delegate to CategoryService.delete.
   */
  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        sendError(res, "Invalid category ID", 400);
        return;
      }

      await CategoryService.delete(id);
      sendSuccess(res, null, "Category deleted successfully");
    } catch (error) {
      console.error("Delete Category Error:", error);
      sendError(res, error);
    }
  };
}

export default new CategoryController();
