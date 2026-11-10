import { loadAllData } from "../data/loader";

export function getImages(carId: string, _variantId?: string) {
  void _variantId;
  const data = loadAllData();
  const rec = data.images.find((i) => i.carId === carId) || null;
  return rec;
}
