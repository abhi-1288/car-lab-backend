import { loadAllData } from "../data/loader";

export function getPrices(carId: string, variantId?: string, city?: string) {
  const data = loadAllData();
  return data.prices.filter((p) => {
    if (p.carId !== carId) return false;
    if (variantId && p.variantId !== variantId) return false;
    if (city && p.priceCity !== city) return false;
    return true;
  });
}
