import { loadAllData } from "../data/loader";

export interface BuildRequirements {
  budget?: number;
  bodyType?: string;
  fuelType?: string;
  transmission?: string;
  features?: string[];
}

export function matchBuild(req: BuildRequirements) {
  const data = loadAllData();
  let candidates = data.cars.slice();
  if (req.bodyType) candidates = candidates.filter((c: any) => (c.bodyType || "").toLowerCase().includes(req.bodyType!.toLowerCase()));
  if (req.fuelType) candidates = candidates.filter((c: any) => (c.fuelTypes || []).some((f: string) => f.toLowerCase() === req.fuelType!.toLowerCase()));
  if (req.transmission) candidates = candidates.filter((c: any) => (c.transmissions || []).some((t: string) => t.toLowerCase() === req.transmission!.toLowerCase()));
  if (req.budget) candidates = candidates.filter((c: any) => (c.price?.minExShowroom ?? 0) <= req.budget!);
  const matches = candidates.map((c: any) => {
    let score = 0;
    if (req.budget && c.price?.minExShowroom) score += Math.max(0, 100 - ((c.price.minExShowroom / req.budget) * 100 - 50));
    if (c.rating) score += c.rating * 5;
    return { car: c, score: Math.round(score) };
  });
  matches.sort((a, b) => b.score - a.score);
  return { requirements: req, matches: matches.slice(0, 20) };
}
