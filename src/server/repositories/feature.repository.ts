import { loadAllData } from "../data/loader";

export function getFeatures(carId: string, variantId?: string) {
  const data = loadAllData();
  if (variantId) return data.features.find((f) => f.carId === carId && f.variantId === variantId) || null;
  return data.features.filter((f) => f.carId === carId);
}
