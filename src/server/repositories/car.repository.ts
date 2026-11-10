import { loadAllData } from "../data/loader";

export function getAllCars() {
  return loadAllData().cars;
}

export function getCarBySlug(slug: string) {
  return loadAllData().cars.find((c) => c.slug === slug) || null;
}

export function getCarById(id: string) {
  return loadAllData().cars.find((c) => c.id === id) || null;
}

export function getCarsByBrand(brand: string) {
  return loadAllData().cars.filter((c) => c.brand === brand);
}

export function getCompleteCar(carId: string) {
  const data = loadAllData();
  const car = data.cars.find((c) => c.id === carId) || null;
  if (!car) return null;
  const variants = data.variants.filter((v) => v.carId === carId);
  const specifications = data.specifications.filter((s) => s.carId === carId);
  const features = data.features.filter((f) => f.carId === carId);
  const prices = data.prices.filter((p) => p.carId === carId);
  const images = data.images.find((i) => i.carId === carId) || null;
  return { car, variants, specifications, features, prices, images };
}
