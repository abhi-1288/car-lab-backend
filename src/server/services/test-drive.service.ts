import fs from "node:fs";
import path from "node:path";
// config not needed here

const STORE = path.resolve(process.cwd(), "data", "customer", "test-drives.json");

function ensureDir() {
  const dir = path.dirname(STORE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readAll(): any[] {
  ensureDir();
  if (!fs.existsSync(STORE)) return [];
  try { return JSON.parse(fs.readFileSync(STORE, "utf8")); } catch { return []; }
}

function writeAll(rows: any[]) {
  ensureDir();
  fs.writeFileSync(STORE, JSON.stringify(rows, null, 2));
}

export const testDriveService = {
  create: (payload: any) => {
    const rows = readAll();
    const record = { id: `td_${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
    rows.push(record);
    writeAll(rows);
    return record;
  },
  list: () => readAll(),
};
