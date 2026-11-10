import { z } from "zod";

export const specificationSchema = z.object({
  variantId: z.string().min(1),
  carId: z.string().min(1),
  carName: z.string().optional(),
  variantName: z.string().optional(),
  specifications: z.record(z.any()).optional(),
}).passthrough();

export const specificationsFileSchema = z.array(specificationSchema);
export type SpecificationRecord = z.infer<typeof specificationSchema>;
