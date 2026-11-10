import * as brandRepo from "../repositories/brand.repository";
import * as carRepo from "../repositories/car.repository";
import * as variantRepo from "../repositories/variant.repository";
import * as specRepo from "../repositories/specification.repository";
// featureRepo available if needed
import * as priceRepo from "../repositories/price.repository";
import * as imageRepo from "../repositories/image.repository";

export const catalogueService = {
  listBrands: () => brandRepo.getAllBrands(),
  listCars: (query?: { brand?: string; bodyType?: string; q?: string }) => {
    let cars = carRepo.getAllCars();
    if (query?.brand) cars = cars.filter((c: any) => c.brand === query.brand);
    if (query?.bodyType) cars = cars.filter((c: any) => (c.bodyType || "").toLowerCase() === query.bodyType!.toLowerCase());
    if (query?.q) {
      const q = query.q.toLowerCase();
      cars = cars.filter((c: any) => (c.name || "").toLowerCase().includes(q) || (c.slug || "").toLowerCase().includes(q));
    }
    return cars;
  },
  getCarBySlug: (slug: string) => carRepo.getCarBySlug(slug),
  getVariants: (slug: string) => {
    const car = carRepo.getCarBySlug(slug);
    if (!car) return null;
    return variantRepo.getVariantsByCarId(car.id);
  },
  getSpecifications: (slug: string) => {
    const car = carRepo.getCarBySlug(slug);
    if (!car) return null;
    return specRepo.getSpecifications(car.id);
  },
  getPrices: (slug: string, city?: string) => {
    const car = carRepo.getCarBySlug(slug);
    if (!car) return null;
    return priceRepo.getPrices(car.id, undefined, city);
  },
  getImages: (slug: string) => {
    const car = carRepo.getCarBySlug(slug);
    if (!car) return null;
    return imageRepo.getImages(car.id);
  },
  getCompleteCar: (carId: string) => carRepo.getCompleteCar(carId),
};
