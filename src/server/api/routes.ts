import { Router } from "express";
import { catalogueService } from "../services/catalogue.service";
import { discover } from "../services/discovery.service";
import { matchBuild } from "../services/matching.service";
import { compare } from "../services/comparison.service";
import { calculateOwnership } from "../services/ownership.service";
import { simulateBoot } from "../services/boot.service";
import { testDriveService } from "../services/test-drive.service";
import { enquiryService } from "../services/enquiry.service";
import { campaignService } from "../services/campaign.service";
import { runIntegrityCheck } from "../data/integrity";
import { rebuildConsolidated } from "../data/rebuild";
import { loadAllData, clearCache } from "../data/loader";
import { adminAuth } from "../middleware/auth";

const router = Router();

// Vehicle catalogue
router.get("/cars", (req, res) => {
  const brand = req.query.brand as string | undefined;
  const bodyType = req.query.bodyType as string | undefined;
  const q = req.query.q as string | undefined;
  res.json(catalogueService.listCars({ brand, bodyType, q }));
});

router.get("/cars/:slug", (req, res) => {
  const car = catalogueService.getCarBySlug(req.params.slug);
  if (!car) return res.status(404).json({ error: "Not found" });
  res.json(car);
});

router.get("/cars/:slug/variants", (req, res) => {
  const v = catalogueService.getVariants(req.params.slug);
  if (v === null) return res.status(404).json({ error: "Not found" });
  res.json(v);
});

router.get("/cars/:slug/specifications", (req, res) => {
  const s = catalogueService.getSpecifications(req.params.slug);
  if (s === null) return res.status(404).json({ error: "Not found" });
  res.json(s);
});

router.get("/cars/:slug/prices", (req, res) => {
  const city = req.query.city as string | undefined;
  const p = catalogueService.getPrices(req.params.slug, city);
  if (p === null) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

router.get("/cars/:slug/images", (req, res) => {
  const images = catalogueService.getImages(req.params.slug);
  if (!images) return res.status(404).json({ error: "Not found" });
  res.json(images);
});

router.get("/brands", (_req, res) => {
  res.json(catalogueService.listBrands());
});

// Discover
router.post("/discover", (req, res) => {
  res.json(discover(req.body));
});

// Build
router.post("/build/match", (req, res) => {
  res.json(matchBuild(req.body || {}));
});

// Compare
router.post("/compare", (req, res) => {
  const ids = (req.body?.carIds || req.body?.ids || []) as string[];
  res.json(compare(ids));
});

// Ownership
router.post("/ownership/calculate", (req, res) => {
  res.json(calculateOwnership(req.body || {}));
});

// Boot
router.post("/boot/simulate", (req, res) => {
  res.json(simulateBoot(req.body || {}));
});

// Test drives
router.post("/test-drives", (req, res) => {
  const record = testDriveService.create(req.body || {});
  res.status(201).json(record);
});

// Enquiries
router.post("/enquiries", (req, res) => {
  const record = enquiryService.create(req.body || {});
  res.status(201).json(record);
});

// Campaigns
router.get("/campaigns/active", (_req, res) => {
  res.json(campaignService.active());
});
router.get("/campaigns/:id", (req, res) => {
  const c = campaignService.getById(req.params.id);
  if (!c) return res.status(404).json({ error: "Not found" });
  res.json(c);
});
router.post("/campaigns/:id/impression", (req, res) => {
  res.json(campaignService.impression(req.params.id));
});
router.post("/campaigns/:id/click", (req, res) => {
  res.json(campaignService.click(req.params.id));
});

// Admin
router.get("/admin/data-integrity", adminAuth, (_req, res) => {
  res.json(runIntegrityCheck());
});
router.post("/admin/data/reload", adminAuth, (_req, res) => {
  clearCache();
  loadAllData(true);
  res.json({ ok: true, loadedAt: new Date().toISOString() });
});
router.post("/admin/data/rebuild", adminAuth, (_req, res) => {
  try {
    const result = rebuildConsolidated();
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});

export default router;
