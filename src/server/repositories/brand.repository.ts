import { loadAllData } from "../data/loader";

export function getAllBrands() {
  return loadAllData().brands;
}

export function getBrandById(id: string) {
  return loadAllData().brands.find((b) => b.id === id) || null;
}

export function getBrandBySlug(slug: string) {
  return loadAllData().brands.find((b) => b.slug === slug) || null;
}
