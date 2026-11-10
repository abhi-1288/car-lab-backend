import { z } from "zod";

export const priceSchema = z.object({
  variantId: z.string().min(1),
  carId: z.string().min(1),
  carName: z.string().optional(),
  variantName: z.string().optional(),
  fuelType: z.string().nullable().optional(),
  exShowroomPrice: z.union([z.number(), z.string()]).nullable().optional(),
  onRoadPrice: z.union([z.number(), z.string()]).nullable().optional(),
  priceBreakup: z.record(z.any()).optional().nullable(),
  priceCity: z.string().nullable().optional(),
}).passthrough();

export const pricesFileSchema = z.array(priceSchema);
export type PriceRecord = z.infer<typeof priceSchema>;
