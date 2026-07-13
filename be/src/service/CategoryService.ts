import prisma from "../lib/prisma";
import { getUniqueCategorySlug } from "../lib/slug";
import { AppError } from "../lib/AppError";

class CategoryService {
  public async getAll() {
    return prisma.category.findMany({
      include: {
        _count: {
          select: { catalogItems: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  public async create(data: { name: string; slug?: string }) {
    const slug = await getUniqueCategorySlug(data.slug || data.name);

    return prisma.category.create({
      data: {
        name: data.name,
        slug,
      },
      include: {
        _count: {
          select: { catalogItems: true },
        },
      },
    });
  }

  public async update(id: number, data: { name?: string; slug?: string }) {
    if (isNaN(id)) {
      throw new AppError("Invalid category ID", 400);
    }

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new AppError("Category not found", 404);
    }

    let newSlug = existingCategory.slug;
    if (data.slug) {
      newSlug = await getUniqueCategorySlug(data.slug, id);
    } else if (data.name && data.name !== existingCategory.name) {
      newSlug = await getUniqueCategorySlug(data.name, id);
    }

    return prisma.category.update({
      where: { id },
      data: {
        name: data.name ?? existingCategory.name,
        slug: newSlug,
      },
      include: {
        _count: {
          select: { catalogItems: true },
        },
      },
    });
  }

  public async delete(id: number) {
    if (isNaN(id)) {
      throw new AppError("Invalid category ID", 400);
    }

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new AppError("Category not found", 404);
    }

    await prisma.category.delete({
      where: { id },
    });

    return true;
  }
}

export default new CategoryService();
