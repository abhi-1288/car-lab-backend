import { z } from "zod";

export const featureSchema = z.object({
  variantId: z.string().min(1),
  carId: z.string().min(1),
  carName: z.string().optional(),
  variantName: z.string().optional(),
  features: z.record(z.any()).optional(),
}).passthrough();

export const featuresFileSchema = z.array(featureSchema);
export type FeatureRecord = z.infer<typeof featureSchema>;
