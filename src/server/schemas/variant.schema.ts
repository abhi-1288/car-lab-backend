import { z } from "zod";

export const variantSchema = z.object({
  id: z.string().min(1),
  carId: z.string().min(1),
  carName: z.string().optional(),
  modelId: z.string().nullable().optional(),
  centralId: z.number().nullable().optional(),
  name: z.string().min(1),
  fullName: z.string().optional(),
  fuelType: z.string().nullable().optional(),
  transmission: z.string().nullable().optional(),
  displacement: z.string().nullable().optional(),
  maxPower: z.string().nullable().optional(),
  mileageARAI: z.union([z.number(), z.string()]).optional(),
  exShowroomPrice: z.union([z.number(), z.string()]).nullable().optional(),
  onRoadPrice: z.union([z.number(), z.string()]).nullable().optional(),
  status: z.string().optional(),
  tag: z.string().nullable().optional(),
  topPick: z.boolean().optional(),
  waitingPeriod: z.string().nullable().optional(),
  keyFeatures: z.array(z.string()).optional(),
  keyMissingFeatures: z.array(z.string()).optional(),
  url: z.string().nullable().optional(),
}).passthrough();

export const variantsFileSchema = z.array(variantSchema);
export type VariantRecord = z.infer<typeof variantSchema>;
