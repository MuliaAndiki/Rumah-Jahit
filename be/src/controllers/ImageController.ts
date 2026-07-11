import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";
import { deleteFromCloudinary } from "../lib/cloudinary";
import { sendSuccess, sendError } from "../lib/response";

const imageInputSchema = z.object({
  imageUrl: z.string().url("Invalid image URL format"),
  cloudinaryPublicId: z.string().min(1, "Cloudinary public ID is required"),
  isPrimary: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

const addImagesSchema = z.union([
  z.array(imageInputSchema),
  z.object({ images: z.array(imageInputSchema) }),
  imageInputSchema, // support single image object directly
]);

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
   * POST /api/admin/catalog/:itemId/images
   * Add one or more new images to an existing catalog item.
   */
  public addImages = async (req: Request, res: Response): Promise<void> => {
    try {
      const itemId = req.params.itemId;

      const item = await prisma.catalogItem.findUnique({
        where: { id: itemId },
        include: {
          images: {
            orderBy: { displayOrder: "desc" },
            take: 1,
          },
        },
      });

      if (!item) {
        sendError(res, "Catalog item not found", 404);
        return;
      }

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

      if (imagesPayload.length === 0) {
        sendError(res, "At least one image must be provided", 400);
        return;
      }

      const currentMaxOrder = item.images.length > 0 ? item.images[0].displayOrder : -1;
      const existingImagesCount = await prisma.catalogImage.count({
        where: { catalogItemId: itemId },
      });

      const updatedImages = await prisma.$transaction(async (tx) => {
        const hasPrimaryNew = imagesPayload.some((img) => img.isPrimary === true);

        if (hasPrimaryNew) {
          // Unset any existing primary image for this catalog item
          await tx.catalogImage.updateMany({
            where: { catalogItemId: itemId },
            data: { isPrimary: false },
          });
        }

        await tx.catalogImage.createMany({
          data: imagesPayload.map((img, idx) => ({
            catalogItemId: itemId,
            imageUrl: img.imageUrl,
            cloudinaryPublicId: img.cloudinaryPublicId,
            isPrimary: img.isPrimary ?? (!hasPrimaryNew && existingImagesCount === 0 && idx === 0),
            displayOrder: img.displayOrder !== undefined ? img.displayOrder : currentMaxOrder + 1 + idx,
          })),
        });

        return tx.catalogImage.findMany({
          where: { catalogItemId: itemId },
          orderBy: [
            { isPrimary: "desc" },
            { displayOrder: "asc" },
          ],
        });
      });

      sendSuccess(res, updatedImages, "Images added successfully to catalog item", 201);
    } catch (error) {
      console.error("Add Images Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * DELETE /api/admin/images/:imageId
   * Delete a SINGLE image. Delete from Cloudinary first via cloudinaryPublicId, then remove from DB.
   */
  public deleteImage = async (req: Request, res: Response): Promise<void> => {
    try {
      const imageId = req.params.imageId;

      const image = await prisma.catalogImage.findUnique({
        where: { id: imageId },
      });

      if (!image) {
        sendError(res, "Image not found", 404);
        return;
      }

      // 1. Delete from Cloudinary using public ID
      if (image.cloudinaryPublicId) {
        await deleteFromCloudinary(image.cloudinaryPublicId);
      }

      // 2. Remove from Prisma DB within transaction to check primary image promotion if needed
      await prisma.$transaction(async (tx) => {
        await tx.catalogImage.delete({
          where: { id: imageId },
        });

        if (image.isPrimary) {
          // If the deleted image was primary, promote the lowest display order remaining image to primary
          const nextImage = await tx.catalogImage.findFirst({
            where: { catalogItemId: image.catalogItemId },
            orderBy: { displayOrder: "asc" },
          });

          if (nextImage) {
            await tx.catalogImage.update({
              where: { id: nextImage.id },
              data: { isPrimary: true },
            });
          }
        }
      });

      sendSuccess(res, null, "Image deleted successfully from Cloudinary and Database");
    } catch (error) {
      console.error("Delete Image Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * PATCH /api/admin/images/:imageId/set-primary
   * Set a specific image as isPrimary = true and automatically update all other images of that same catalogItemId to isPrimary = false in a transaction.
   */
  public setPrimaryImage = async (req: Request, res: Response): Promise<void> => {
    try {
      const imageId = req.params.imageId;

      const targetImage = await prisma.catalogImage.findUnique({
        where: { id: imageId },
      });

      if (!targetImage) {
        sendError(res, "Image not found", 404);
        return;
      }

      const updatedImages = await prisma.$transaction(async (tx) => {
        // 1. Set all images for this catalog item to isPrimary = false
        await tx.catalogImage.updateMany({
          where: { catalogItemId: targetImage.catalogItemId },
          data: { isPrimary: false },
        });

        // 2. Set the target image to isPrimary = true
        await tx.catalogImage.update({
          where: { id: imageId },
          data: { isPrimary: true },
        });

        // Return updated list of images for this catalog item
        return tx.catalogImage.findMany({
          where: { catalogItemId: targetImage.catalogItemId },
          orderBy: [
            { isPrimary: "desc" },
            { displayOrder: "asc" },
          ],
        });
      });

      sendSuccess(res, updatedImages, "Primary image updated successfully");
    } catch (error) {
      console.error("Set Primary Image Error:", error);
      sendError(res, error, 500);
    }
  };

  /**
   * PATCH /api/admin/images/reorder
   * Accept an array of { id: string, displayOrder: number } to update the slider sequence of images for a catalog item.
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

      if (itemsToReorder.length === 0) {
        sendError(res, "No items provided for reordering", 400);
        return;
      }

      // Execute all displayOrder updates in a single transaction
      await prisma.$transaction(
        itemsToReorder.map((item) =>
          prisma.catalogImage.update({
            where: { id: item.id },
            data: { displayOrder: item.displayOrder },
          })
        )
      );

      sendSuccess(res, null, "Images reordered successfully");
    } catch (error) {
      console.error("Reorder Images Error:", error);
      sendError(res, error, 500);
    }
  };
}

export default new ImageController();
