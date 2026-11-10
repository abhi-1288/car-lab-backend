import { loadAllData } from "./loader";

export function normalizeBrand(brand: any) {
  return brand;
}

export function getVariantsForCar(carId: string) {
  const data = loadAllData();
  return data.variants.filter((v) => v.carId === carId);
}

export function getSpecsForVariant(variantId: string) {
  const data = loadAllData();
  return data.specifications.find((s) => s.variantId === variantId) || null;
}

export function getFeaturesForVariant(variantId: string) {
  const data = loadAllData();
  return data.features.find((f) => f.variantId === variantId) || null;
}

export function getPricesForVariant(variantId: string, city?: string) {
  const data = loadAllData();
  return data.prices.filter((p) => p.variantId === variantId && (!city || p.priceCity === city));
}

export function getImagesForCar(carId: string) {
  const data = loadAllData();
  return data.images.find((i) => i.carId === carId) || null;
}
