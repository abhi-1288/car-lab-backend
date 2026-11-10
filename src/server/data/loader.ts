import fs from "node:fs";
import path from "node:path";
import {
  brandsFileSchema,
  carsFileSchema,
  variantsFileSchema,
  specificationsFileSchema,
  featuresFileSchema,
  pricesFileSchema,
  imagesFileSchema,
} from "../schemas";
import { setCache, getCache, clearCache, type CarLabDataCache } from "./cache";

const SOURCE_FILES = ["brands.json", "cars.json", "variants.json", "specifications.json", "features.json", "prices.json", "images.json"];

function sourceMtimes(dir: string): Record<string, number> {
  const mt: Record<string, number> = {};
  for (const f of SOURCE_FILES) {
    try { mt[f] = fs.statSync(path.join(dir, f)).mtimeMs; } catch { mt[f] = 0; }
  }
  return mt;
}

function mtimesChanged(cached: CarLabDataCache, dir: string): boolean {
  const current = sourceMtimes(dir);
  for (const f of SOURCE_FILES) {
    if (cached.mtimes[f] !== current[f]) return true;
  }
  return false;
}

function candidateDirs(): string[] {
  const dirs: string[] = [];
  // cwd based
  dirs.push(path.resolve(process.cwd(), "src", "CarLab-Data"));
  dirs.push(path.resolve(process.cwd(), "CarLab-Data"));
  // relative to this file (compiled)
  dirs.push(path.resolve(__dirname, "..", "..", "..", "src", "CarLab-Data"));
  dirs.push(path.resolve(__dirname, "..", "..", "CarLab-Data"));
  return dirs;
}

export function resolveDataDir(): string {
  for (const d of candidateDirs()) {
    if (fs.existsSync(path.join(d, "brands.json"))) return d;
  }
  throw new Error("CarLab-Data directory not found. Checked: " + candidateDirs().join(", "));
}

function readJsonFile(filePath: string): unknown {
  if (!fs.existsSync(filePath)) throw new Error(`Missing data file: ${filePath}`);
  const raw = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Malformed JSON in ${filePath}: ${(e as Error).message}`);
  }
}

export function loadAllData(force = false): CarLabDataCache {
  const cached = getCache();
  if (!force && cached) {
    const dir = resolveDataDir();
    if (!mtimesChanged(cached, dir)) return cached;
  }
  const dir = resolveDataDir();
  const brands = brandsFileSchema.parse(readJsonFile(path.join(dir, "brands.json")));
  const cars = carsFileSchema.parse(readJsonFile(path.join(dir, "cars.json")));
  const variants = variantsFileSchema.parse(readJsonFile(path.join(dir, "variants.json")));
  const specifications = specificationsFileSchema.parse(readJsonFile(path.join(dir, "specifications.json")));
  const features = featuresFileSchema.parse(readJsonFile(path.join(dir, "features.json")));
  const prices = pricesFileSchema.parse(readJsonFile(path.join(dir, "prices.json")));
  const images = imagesFileSchema.parse(readJsonFile(path.join(dir, "images.json")));

  const data: CarLabDataCache = {
    brands,
    cars,
    variants,
    specifications,
    features,
    prices,
    images,
    loadedAt: new Date().toISOString(),
    mtimes: sourceMtimes(dir),
  };
  if (force) clearCache();
  setCache(data);
  return data;
}

// Avoid circular require by re-exporting cache helpers directly
export { getCache, clearCache } from "./cache";
