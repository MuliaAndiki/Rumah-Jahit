import prisma from "./prisma";

/**
 * Generates a URL-friendly slug from a text string (lowercase, hyphenated, alphanumeric only).
 */
export function generateSlug(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric chars
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // trim hyphens from ends
}

/**
 * Ensures a category slug is unique by appending numerical suffixes if needed.
 * @param baseName - The category name or desired title
 * @param excludeId - Optional category ID to exclude when updating an existing category
 */
export async function getUniqueCategorySlug(baseName: string, excludeId?: number): Promise<string> {
  const baseSlug = generateSlug(baseName) || "category";
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.category.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || (excludeId !== undefined && existing.id === excludeId)) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

/**
 * Ensures a catalog item slug is unique by appending numerical suffixes if needed.
 * @param baseTitle - The catalog item title
 * @param excludeId - Optional catalog item UUID to exclude when updating an existing item
 */
export async function getUniqueCatalogSlug(baseTitle: string, excludeId?: string): Promise<string> {
  const baseSlug = generateSlug(baseTitle) || "catalog-item";
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.catalogItem.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || (excludeId !== undefined && existing.id === excludeId)) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}
