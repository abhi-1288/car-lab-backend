import fs from "node:fs";
import path from "node:path";

const STORE = path.resolve(process.cwd(), "data", "customer", "campaigns.json");
const EVENTS = path.resolve(process.cwd(), "data", "customer", "campaign-events.json");

function ensure(p: string) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
function read(p: string): any[] {
  ensure(p);
  if (!fs.existsSync(p)) return [];
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return []; }
}
function write(p: string, rows: any[]) {
  ensure(p);
  fs.writeFileSync(p, JSON.stringify(rows, null, 2));
}

export const campaignService = {
  active: () => read(STORE).filter((c: any) => c.status === "active"),
  getById: (id: string) => read(STORE).find((c: any) => c.id === id) || null,
  impression: (id: string) => {
    const events = read(EVENTS);
    events.push({ type: "impression", campaignId: id, at: new Date().toISOString() });
    write(EVENTS, events);
    return { ok: true };
  },
  click: (id: string) => {
    const events = read(EVENTS);
    events.push({ type: "click", campaignId: id, at: new Date().toISOString() });
    write(EVENTS, events);
    return { ok: true };
  },
};
