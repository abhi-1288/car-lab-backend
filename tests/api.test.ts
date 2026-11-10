import { describe, it, expect, beforeAll, afterAll } from "vitest";
import http from "node:http";
import app from "../src/server/index";

let server: http.Server;
let base: string;

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      base = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

describe("API", () => {
  it("health", async () => {
    const r = await fetch(base + "/health");
    expect(r.ok).toBe(true);
  });
  it("list cars", async () => {
    const r = await fetch(base + "/api/v1/cars");
    expect(r.ok).toBe(true);
    const data = await r.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
  it("car details by slug", async () => {
    const list = await (await fetch(base + "/api/v1/cars")).json();
    const slug = list[0].slug;
    const r = await fetch(base + `/api/v1/cars/${slug}`);
    expect(r.ok).toBe(true);
  });
  it("brands", async () => {
    const r = await fetch(base + "/api/v1/brands");
    expect(r.ok).toBe(true);
  });
  it("discover", async () => {
    const r = await fetch(base + "/api/v1/discover", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ budget: 1000000 }) });
    expect(r.ok).toBe(true);
  });
  it("build match", async () => {
    const r = await fetch(base + "/api/v1/build/match", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ budget: 1000000 }) });
    expect(r.ok).toBe(true);
  });
  it("compare", async () => {
    const list = await (await fetch(base + "/api/v1/cars")).json();
    const r = await fetch(base + "/api/v1/compare", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ carIds: [list[0].id, list[1].id] }) });
    expect(r.ok).toBe(true);
  });
  it("ownership", async () => {
    const r = await fetch(base + "/api/v1/ownership/calculate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ price: 1000000 }) });
    expect(r.ok).toBe(true);
  });
  it("boot", async () => {
    const r = await fetch(base + "/api/v1/boot/simulate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ bootCapacityLitres: 400, luggageItems: [{ name: "bag", volumeLitres: 50 }] }) });
    expect(r.ok).toBe(true);
  });
  it("test drive submission", async () => {
    const r = await fetch(base + "/api/v1/test-drives", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Test" }) });
    expect(r.status).toBe(201);
  });
  it("enquiry submission", async () => {
    const r = await fetch(base + "/api/v1/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Test" }) });
    expect(r.status).toBe(201);
  });
  it("campaigns active", async () => {
    const r = await fetch(base + "/api/v1/campaigns/active");
    expect(r.ok).toBe(true);
  });
  it("admin unauthorized", async () => {
    const r = await fetch(base + "/api/v1/admin/data-integrity");
    expect(r.status).toBe(401);
  });
});
