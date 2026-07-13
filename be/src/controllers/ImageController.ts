import { Request, Response } from "express";
import { z } from "zod";
import { sendSuccess, sendError } from "../lib/response";
import ImageService from "../service/ImageService";

const imageInputSchema = z.object({
  imageUrl: z.string().url("Invalid image URL format"),
  cloudinaryPublicId: z.string().min(1, "Cloudinary public ID is required"),
  isPrimary: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

const addImagesSchema = z.union([
  z.array(imageInputSchema),
  z.object({ images: z.array(imageInputSchema) }),
  imageInputSchema,
]);

const createImageSchema = z.object({
  catalogItemId: z.string().uuid("Invalid catalog item ID format"),
  imageUrl: z.string().url("Invalid image URL format"),
  cloudinaryPublicId: z.string().min(1, "Cloudinary public ID is required"),
  isPrimary: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

const updateImageSchema = z.object({
  catalogItemId: z.string().uuid("Invalid catalog item ID format").optional(),
  imageUrl: z.string().url("Invalid image URL format").optional(),
  cloudinaryPublicId: z.string().min(1, "Cloudinary public ID is required").optional(),
  isPrimary: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

const reorderItemSchema = z.object({
  id: z.string().uuid("Invalid image ID format"),
  displayOrder: z.number().int("displayOrder must be an integer"),
});

const reorderSchema = z.union([
  z.array(reorderItemSchema),
  z.object({ items: z.array(reorderItemSchema) }),
]);

class ImageController {
  /**
   * POST /api/admin/images
   * Validate payload and delegate to ImageService.createImage.
   */
  public createImage = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = createImageSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Invalid image payload", 400);
        return;
      }

      const newImage = await ImageService.createImage(validation.data);
      sendSuccess(res, newImage, "Image data saved successfully", 201);
    } catch (error) {
      console.error("Create Image Error:", error);
      sendError(res, error);
    }
  };

  /**
   * POST /api/admin/catalog/:itemId/images
   * Validate and delegate to ImageService.addImages.
   */
  public addImages = async (req: Request, res: Response): Promise<void> => {
    try {
      const itemId = req.params.itemId;
      const validation = addImagesSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Invalid image payload", 400);
        return;
      }

      let imagesPayload: Array<z.infer<typeof imageInputSchema>> = [];
      if (Array.isArray(validation.data)) {
        imagesPayload = validation.data;
      } else if ("images" in validation.data) {
        imagesPayload = validation.data.images;
      } else {
        imagesPayload = [validation.data];
      }

      const updatedImages = await ImageService.addImages(itemId, imagesPayload);
      sendSuccess(res, updatedImages, "Images added successfully to catalog item", 201);
    } catch (error) {
      console.error("Add Images Error:", error);
      sendError(res, error);
    }
  };

  /**
   * PUT / PATCH /api/admin/images/:imageId
   * Validate and delegate to ImageService.updateImage.
   */
  public updateImage = async (req: Request, res: Response): Promise<void> => {
    try {
      const imageId = req.params.imageId;
      const validation = updateImageSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Invalid update image payload", 400);
        return;
      }

      const updatedImage = await ImageService.updateImage(imageId, validation.data);
      sendSuccess(res, updatedImage, "Image updated successfully");
    } catch (error) {
      console.error("Update Image Error:", error);
      sendError(res, error);
    }
  };

  /**
   * DELETE /api/admin/images/:imageId
   * Delegate single image deletion (Cloudinary + DB) to ImageService.deleteImage.
   */
  public deleteImage = async (req: Request, res: Response): Promise<void> => {
    try {
      await ImageService.deleteImage(req.params.imageId);
      sendSuccess(res, null, "Image deleted successfully from Cloudinary and Database");
    } catch (error) {
      console.error("Delete Image Error:", error);
      sendError(res, error);
    }
  };

  /**
   * PATCH /api/admin/images/:imageId/set-primary
   * Delegate setting primary image to ImageService.setPrimaryImage.
   */
  public setPrimaryImage = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedImages = await ImageService.setPrimaryImage(req.params.imageId);
      sendSuccess(res, updatedImages, "Primary image updated successfully");
    } catch (error) {
      console.error("Set Primary Image Error:", error);
      sendError(res, error);
    }
  };

  /**
   * PATCH /api/admin/images/reorder
   * Delegate image reordering to ImageService.reorderImages.
   */
  public reorderImages = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = reorderSchema.safeParse(req.body);
      if (!validation.success) {
        sendError(res, validation.error.issues[0]?.message || "Invalid reorder payload", 400);
        return;
      }

      let itemsToReorder: Array<z.infer<typeof reorderItemSchema>> = [];
      if (Array.isArray(validation.data)) {
        itemsToReorder = validation.data;
      } else {
        itemsToReorder = validation.data.items;
      }

      await ImageService.reorderImages(itemsToReorder);
      sendSuccess(res, null, "Images reordered successfully");
    } catch (error) {
      console.error("Reorder Images Error:", error);
      sendError(res, error);
    }
  };

  /**
   * GET /api/admin/images/catalog/:itemId
   * GET /api/admin/catalog/:itemId/images
   * Delegate retrieving catalog images to ImageService.getImagesByCatalog.
   */
  public getImagesByCatalog = async (req: Request, res: Response): Promise<void> => {
    try {
      const images = await ImageService.getImagesByCatalog(req.params.itemId);
      sendSuccess(res, images, "Catalog images fetched successfully");
    } catch (error) {
      console.error("Get Images By Catalog Error:", error);
      sendError(res, error);
    }
  };

  /**
   * GET /api/admin/images/:imageId
   * Delegate fetching single image to ImageService.getImageById.
   */
  public getImageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const image = await ImageService.getImageById(req.params.imageId);
      sendSuccess(res, image, "Image fetched successfully");
    } catch (error) {
      console.error("Get Image By ID Error:", error);
      sendError(res, error);
    }
  };
}

export default new ImageController();
