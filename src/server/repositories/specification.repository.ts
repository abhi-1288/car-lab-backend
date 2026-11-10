import { loadAllData } from "../data/loader";

export function getSpecifications(carId: string, variantId?: string) {
  const data = loadAllData();
  if (variantId) return data.specifications.find((s) => s.carId === carId && s.variantId === variantId) || null;
  return data.specifications.filter((s) => s.carId === carId);
}
