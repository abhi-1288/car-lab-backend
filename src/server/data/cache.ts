import type { BrandRecord, CarRecord, VariantRecord, SpecificationRecord, FeatureRecord, PriceRecord, ImageRecord } from "../schemas";

export interface CarLabDataCache {
  brands: BrandRecord[];
  cars: CarRecord[];
  variants: VariantRecord[];
  specifications: SpecificationRecord[];
  features: FeatureRecord[];
  prices: PriceRecord[];
  images: ImageRecord[];
  loadedAt: string;
  mtimes: Record<string, number>;
}

let cache: CarLabDataCache | null = null;

export function getCache(): CarLabDataCache | null {
  return cache;
}

export function setCache(data: CarLabDataCache): void {
  cache = data;
}

export function clearCache(): void {
  cache = null;
}

export function isCached(): boolean {
  return cache !== null;
}
