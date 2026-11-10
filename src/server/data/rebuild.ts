import fs from "node:fs";
import path from "node:path";
import { loadAllData, clearCache } from "./loader";
import { validateAllData } from "./validator";

export function rebuildConsolidated(): { ok: boolean; path: string; counts: any } {
  const report = validateAllData();
  if (!report.success) throw new Error("Validation failed: " + JSON.stringify(report.errors));
  clearCache();
  const data = loadAllData(true);
  const brands = data.brands;
  const cars = data.cars.map((car: any) => {
    const variants = data.variants.filter((v: any) => v.carId === car.id);
    const imageRec = data.images.find((i: any) => i.carId === car.id) || null;
    return { ...car, variants, images: imageRec?.images || [], colors: imageRec?.colors || [] };
  });
  const consolidated = {
    metadata: {
      source: "CarDekho (https://www.cardekho.com)",
      generatedAt: new Date().toISOString(),
      priceCity: "New Delhi",
      currency: "INR",
      counts: {
        brands: brands.length,
        cars: cars.length,
        variants: data.variants.length,
        variantSpecs: data.specifications.length,
        variantFeatures: data.features.length,
        variantPrices: data.prices.length,
      },
      note: "Generated from canonical JSON files in src/CarLab-Data. Do not edit manually.",
    },
    brands,
    cars,
  };
  const outPath = path.resolve(process.cwd(), "src", "CarLab-Data", "complete-car-database.json");
  fs.writeFileSync(outPath, JSON.stringify(consolidated));
  return { ok: true, path: outPath, counts: consolidated.metadata.counts };
}
