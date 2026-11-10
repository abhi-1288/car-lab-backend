import { loadAllData } from "../data/loader";

export function getVariantsByCarId(carId: string) {
  return loadAllData().variants.filter((v) => v.carId === carId);
}

export function getVariantById(id: string) {
  return loadAllData().variants.find((v) => v.id === id) || null;
}
