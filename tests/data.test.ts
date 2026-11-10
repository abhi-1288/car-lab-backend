import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { validateAllData } from "../src/server/data/validator";
import { loadAllData } from "../src/server/data/loader";

const DATA_DIR = path.resolve(process.cwd(), "src", "CarLab-Data");

describe("CarLab data files", () => {
  it("all seven canonical files exist", () => {
    for (const f of ["brands.json", "cars.json", "variants.json", "specifications.json", "features.json", "prices.json", "images.json"]) {
      expect(fs.existsSync(path.join(DATA_DIR, f))).toBe(true);
    }
  });

  it("all schemas validate", () => {
    const report = validateAllData();
    expect(report.success).toBe(true);
  });

  it("consolidated file exists", () => {
    expect(fs.existsSync(path.join(DATA_DIR, "complete-car-database.json"))).toBe(true);
  });

  it("counts are non-zero", () => {
    const data = loadAllData();
    expect(data.brands.length).toBeGreaterThan(0);
    expect(data.cars.length).toBeGreaterThan(0);
    expect(data.variants.length).toBeGreaterThan(0);
  });
});
