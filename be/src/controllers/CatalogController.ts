import { Request, Response } from "express";
import { z } from "zod";
import { sendSuccess, sendError } from "../lib/response";
import CatalogService from "../service/CatalogService";

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
   * Get all catalog items delegating to CatalogService.
   */
  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const { items, pagination } = await CatalogService.getAll(req.query);
      sendSuccess(res, items, "Catalog items fetched successfully", 200, pagination);
    } catch (error) {
      console.error("Get Catalog Items Error:", error);
      sendError(res, error);
    }
  };

  /**
   * GET /api/admin/catalog/:id
   * Get item details by ID delegating to CatalogService.
   */
  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await CatalogService.getById(req.params.id);
      sendSuccess(res, item, "Catalog item details fetched successfully");
    } catch (error) {
      console.error("Get Catalog Item By ID Error:", error);
      sendError(res, error);
    }
  };

  /**
   * POST /api/admin/catalog
   * Create new catalog item delegating to CatalogService.
   */
  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = createCatalogSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const createdItem = await CatalogService.create(validation.data);
      sendSuccess(res, createdItem, "Catalog item created successfully", 201);
    } catch (error) {
      console.error("Create Catalog Item Error:", error);
      sendError(res, error);
    }
  };

  /**
   * PUT /api/admin/catalog/:id
   * Update catalog item delegating to CatalogService.
   */
  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = updateCatalogSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Validation failed", 400);
        return;
      }

      const updatedItem = await CatalogService.update(req.params.id, validation.data);
      sendSuccess(res, updatedItem, "Catalog item updated successfully");
    } catch (error) {
      console.error("Update Catalog Item Error:", error);
      sendError(res, error);
    }
  };

  /**
   * DELETE /api/admin/catalog/:id
   * Delete catalog item and images delegating to CatalogService.
   */
  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await CatalogService.delete(req.params.id);
      sendSuccess(res, null, "Catalog item and all associated images deleted successfully");
    } catch (error) {
      console.error("Delete Catalog Item Error:", error);
      sendError(res, error);
    }
  };
}

export default new CatalogController();
