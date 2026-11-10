import { loadAllData } from "./loader";

export interface ValidationReport {
  success: boolean;
  filesChecked: number;
  brands: number;
  cars: number;
  variants: number;
  specifications: number;
  features: number;
  prices: number;
  images: number;
  errors: string[];
  warnings: string[];
}

export function validateAllData(): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  let data;
  try {
    data = loadAllData(true);
  } catch (e) {
    return {
      success: false,
      filesChecked: 0,
      brands: 0,
      cars: 0,
      variants: 0,
      specifications: 0,
      features: 0,
      prices: 0,
      images: 0,
      errors: [(e as Error).message],
      warnings,
    };
  }

  const brandIds = new Set(data.brands.map((b) => b.id));
  const carIds = new Set(data.cars.map((c) => c.id));
  const variantIds = new Set(data.variants.map((v) => v.id));

  // duplicate checks
  const seenBrand = new Set<string>();
  for (const b of data.brands) {
    if (seenBrand.has(b.id)) errors.push(`Duplicate brand id: ${b.id}`);
    seenBrand.add(b.id);
  }
  const seenCar = new Set<string>();
  for (const c of data.cars) {
    if (seenCar.has(c.id)) errors.push(`Duplicate car id: ${c.id}`);
    seenCar.add(c.id);
  }
  const seenVariant = new Set<string>();
  for (const v of data.variants) {
    if (seenVariant.has(v.id)) errors.push(`Duplicate variant id: ${v.id}`);
    seenVariant.add(v.id);
  }

  // foreign keys
  for (const c of data.cars) {
    if (c.brand && !brandIds.has(c.brand) && !data.brands.some((b) => b.id === c.brand || b.slug === c.brand)) {
      warnings.push(`Car ${c.id} references unknown brand ${c.brand}`);
    }
  }
  for (const v of data.variants) {
    if (!carIds.has(v.carId)) errors.push(`Variant ${v.id} references unknown carId ${v.carId}`);
  }
  for (const s of data.specifications) {
    if (!carIds.has(s.carId)) warnings.push(`Specification ${s.variantId} references unknown carId ${s.carId}`);
    if (!variantIds.has(s.variantId)) warnings.push(`Specification references unknown variantId ${s.variantId}`);
  }
  for (const f of data.features) {
    if (!carIds.has(f.carId)) warnings.push(`Feature ${f.variantId} references unknown carId ${f.carId}`);
    if (!variantIds.has(f.variantId)) warnings.push(`Feature references unknown variantId ${f.variantId}`);
  }
  for (const p of data.prices) {
    if (!carIds.has(p.carId)) warnings.push(`Price ${p.variantId} references unknown carId ${p.carId}`);
    if (!variantIds.has(p.variantId)) warnings.push(`Price references unknown variantId ${p.variantId}`);
  }
  for (const img of data.images) {
    if (!carIds.has(img.carId)) warnings.push(`Image record references unknown carId ${img.carId}`);
  }

  // missing info warnings
  for (const v of data.variants) {
    if (v.exShowroomPrice == null) warnings.push(`Variant ${v.id} has no ex-showroom price`);
  }

  return {
    success: errors.length === 0,
    filesChecked: 7,
    brands: data.brands.length,
    cars: data.cars.length,
    variants: data.variants.length,
    specifications: data.specifications.length,
    features: data.features.length,
    prices: data.prices.length,
    images: data.images.length,
    errors,
    warnings,
  };
}
