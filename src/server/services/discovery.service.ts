import { loadAllData } from "../data/loader";

export interface LifeProfile {
  budget?: number;
  bodyType?: string;
  fuelType?: string;
  seating?: number;
  usage?: string;
}

export function parseLifeProfile(input: any): LifeProfile {
  return {
    budget: input?.budget ? Number(input.budget) : undefined,
    bodyType: input?.bodyType,
    fuelType: input?.fuelType,
    seating: input?.seating ? Number(input.seating) : undefined,
    usage: input?.usage,
  };
}

export function discover(profileInput: any) {
  const profile = parseLifeProfile(profileInput);
  const data = loadAllData();
  let cars = data.cars.slice();
  if (profile.bodyType) cars = cars.filter((c: any) => (c.bodyType || "").toLowerCase().includes(profile.bodyType!.toLowerCase()));
  if (profile.fuelType) cars = cars.filter((c: any) => (c.fuelTypes || []).some((f: string) => f.toLowerCase() === profile.fuelType!.toLowerCase()));
  if (profile.seating) cars = cars.filter((c: any) => Number(c.seatingCapacity) >= (profile.seating || 0));
  if (profile.budget) {
    cars = cars.filter((c: any) => {
      const min = c.price?.minExShowroom ?? 0;
      return min <= profile.budget!;
    });
  }
  // score by topPick? simple
  const ranked = cars.map((c: any) => ({ car: c, score: (c.topPick ? 10 : 0) + (c.rating || 0) }));
  ranked.sort((a, b) => b.score - a.score);
  return { profile, results: ranked.map((r) => r.car), count: ranked.length };
}
