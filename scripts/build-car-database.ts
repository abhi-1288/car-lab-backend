import fs from "node:fs";
import path from "node:path";
import { loadAllData, clearCache } from "../src/server/data/loader";
import { validateAllData } from "../src/server/data/validator";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

const report = validateAllData();
if (!report.success) {
  console.error("Validation failed:", JSON.stringify(report.errors, null, 2));
  process.exit(1);
}

clearCache();
const data = loadAllData(true);

const brands = data.brands;
const cars = data.cars.map((car: any) => {
  const variants = data.variants.filter((v: any) => v.carId === car.id);
  const imageRec = data.images.find((i: any) => i.carId === car.id) || null;
  const images = imageRec?.images || [];
  const colors = imageRec?.colors || [];
  return { ...car, variants, images, colors };
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
if (dryRun) {
  console.log("Dry run: would write", outPath);
  console.log(JSON.stringify(consolidated.metadata, null, 2));
  process.exit(0);
}

fs.writeFileSync(outPath, JSON.stringify(consolidated));
console.log("Wrote", outPath);
console.log(JSON.stringify(consolidated.metadata.counts, null, 2));
