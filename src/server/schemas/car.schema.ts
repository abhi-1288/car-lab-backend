import { z } from "zod";

export const carSchema = z.object({
  id: z.string().min(1),
  modelId: z.union([z.string(), z.number()]).nullable().optional(),
  name: z.string().min(1),
  shortName: z.string().optional(),
  brand: z.string().min(1),
  brandName: z.string().optional(),
  slug: z.string().min(1),
  status: z.string().optional(),
  bodyType: z.string().nullable().optional(),
  vehicleType: z.string().nullable().optional(),
  segment: z.string().nullable().optional(),
  fuelTypes: z.array(z.string()).optional(),
  transmissions: z.array(z.string()).optional(),
  seatingCapacity: z.union([z.number(), z.string(), z.null()]).optional(),
  engine: z.string().nullable().optional(),
  power: z.string().nullable().optional(),
  airBags: z.string().nullable().optional(),
  mileage: z.string().nullable().optional(),
  rating: z.number().nullable().optional(),
  reviewCount: z.number().nullable().optional(),
  popularity: z.number().nullable().optional(),
  variantCount: z.number().optional(),
  launchedOn: z.string().nullable().optional(),
  heroImage: z.string().nullable().optional(),
  heroImageWebp: z.string().nullable().optional(),
  imageCount: z.number().optional(),
}).passthrough();

export const carsFileSchema = z.array(carSchema);
export type CarRecord = z.infer<typeof carSchema>;
