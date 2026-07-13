import prisma from "../lib/prisma";
import { deleteFromCloudinary } from "../lib/cloudinary";
import { AppError } from "../lib/AppError";

class ImageService {
  public async createImage(data: {
    catalogItemId: string;
    imageUrl: string;
    cloudinaryPublicId: string;
    isPrimary?: boolean;
    displayOrder?: number;
  }) {
    const { catalogItemId, imageUrl, cloudinaryPublicId, isPrimary, displayOrder } = data;

    const item = await prisma.catalogItem.findUnique({
      where: { id: catalogItemId },
      include: {
        images: {
          orderBy: { displayOrder: "desc" },
          take: 1,
        },
      },
    });

    if (!item) {
      throw new AppError("Catalog item not found", 404);
    }

    const currentMaxOrder = item.images.length > 0 ? item.images[0].displayOrder : -1;
    const existingImagesCount = await prisma.catalogImage.count({
      where: { catalogItemId },
    });

    return prisma.$transaction(async (tx) => {
      const shouldBePrimary = isPrimary ?? (existingImagesCount === 0);

      if (shouldBePrimary) {
        await tx.catalogImage.updateMany({
          where: { catalogItemId },
          data: { isPrimary: false },
        });
      }

      return tx.catalogImage.create({
        data: {
          catalogItemId,
          imageUrl,
          cloudinaryPublicId,
          isPrimary: shouldBePrimary,
          displayOrder: displayOrder !== undefined ? displayOrder : currentMaxOrder + 1,
        },
      });
    });
  }

  public async addImages(
    itemId: string,
    imagesPayload: Array<{
      imageUrl: string;
      cloudinaryPublicId: string;
      isPrimary?: boolean;
      displayOrder?: number;
    }>
  ) {
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
      throw new AppError("Catalog item not found", 404);
    }

    if (!imagesPayload || imagesPayload.length === 0) {
      throw new AppError("At least one image must be provided", 400);
    }

    const currentMaxOrder = item.images.length > 0 ? item.images[0].displayOrder : -1;
    const existingImagesCount = await prisma.catalogImage.count({
      where: { catalogItemId: itemId },
    });

    return prisma.$transaction(async (tx) => {
      const hasPrimaryNew = imagesPayload.some((img) => img.isPrimary === true);

      if (hasPrimaryNew) {
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
  }

  public async updateImage(
    imageId: string,
    data: {
      catalogItemId?: string;
      imageUrl?: string;
      cloudinaryPublicId?: string;
      isPrimary?: boolean;
      displayOrder?: number;
    }
  ) {
    const existingImage = await prisma.catalogImage.findUnique({
      where: { id: imageId },
    });

    if (!existingImage) {
      throw new AppError("Image not found", 404);
    }

    const { catalogItemId, imageUrl, cloudinaryPublicId, isPrimary, displayOrder } = data;
    const targetCatalogItemId = catalogItemId || existingImage.catalogItemId;

    if (catalogItemId && catalogItemId !== existingImage.catalogItemId) {
      const itemExists = await prisma.catalogItem.findUnique({
        where: { id: catalogItemId },
      });
      if (!itemExists) {
        throw new AppError("Target catalog item not found", 404);
      }
    }

    if (cloudinaryPublicId && cloudinaryPublicId !== existingImage.cloudinaryPublicId) {
      if (existingImage.cloudinaryPublicId) {
        await deleteFromCloudinary(existingImage.cloudinaryPublicId);
      }
    }

    return prisma.$transaction(async (tx) => {
      if (isPrimary === true) {
        await tx.catalogImage.updateMany({
          where: { catalogItemId: targetCatalogItemId },
          data: { isPrimary: false },
        });
      }

      const updateData: any = {};
      if (catalogItemId !== undefined) updateData.catalogItemId = catalogItemId;
      if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
      if (cloudinaryPublicId !== undefined) updateData.cloudinaryPublicId = cloudinaryPublicId;
      if (isPrimary !== undefined) updateData.isPrimary = isPrimary;
      if (displayOrder !== undefined) updateData.displayOrder = displayOrder;

      return tx.catalogImage.update({
        where: { id: imageId },
        data: updateData,
      });
    });
  }

  public async deleteImage(imageId: string) {
    const image = await prisma.catalogImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      throw new AppError("Image not found", 404);
    }

    if (image.cloudinaryPublicId) {
      await deleteFromCloudinary(image.cloudinaryPublicId);
    }

    await prisma.$transaction(async (tx) => {
      await tx.catalogImage.delete({
        where: { id: imageId },
      });

      if (image.isPrimary) {
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

    return true;
  }

  public async setPrimaryImage(imageId: string) {
    const targetImage = await prisma.catalogImage.findUnique({
      where: { id: imageId },
    });

    if (!targetImage) {
      throw new AppError("Image not found", 404);
    }

    return prisma.$transaction(async (tx) => {
      await tx.catalogImage.updateMany({
        where: { catalogItemId: targetImage.catalogItemId },
        data: { isPrimary: false },
      });

      await tx.catalogImage.update({
        where: { id: imageId },
        data: { isPrimary: true },
      });

      return tx.catalogImage.findMany({
        where: { catalogItemId: targetImage.catalogItemId },
        orderBy: [
          { isPrimary: "desc" },
          { displayOrder: "asc" },
        ],
      });
    });
  }

  public async reorderImages(itemsToReorder: Array<{ id: string; displayOrder: number }>) {
    if (!itemsToReorder || itemsToReorder.length === 0) {
      throw new AppError("No items provided for reordering", 400);
    }

    await prisma.$transaction(
      itemsToReorder.map((item) =>
        prisma.catalogImage.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    return true;
  }

  public async getImagesByCatalog(itemId: string) {
    return prisma.catalogImage.findMany({
      where: { catalogItemId: itemId },
      orderBy: [
        { isPrimary: "desc" },
        { displayOrder: "asc" },
      ],
    });
  }

  public async getImageById(imageId: string) {
    const image = await prisma.catalogImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      throw new AppError("Image not found", 404);
    }

    return image;
  }
}

export default new ImageService();
