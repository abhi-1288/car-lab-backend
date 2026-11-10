import { loadAllData } from "../data/loader";

export function compare(carIds: string[]) {
  const data = loadAllData();
  const cars = carIds.map((id) => data.cars.find((c: any) => c.id === id)).filter(Boolean);
  return { cars, count: cars.length };
}
