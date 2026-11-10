import { z } from "zod";

export const imageSchema = z.object({
  carId: z.string().min(1),
  carName: z.string().optional(),
  heroImage: z.string().nullable().optional(),
  heroImageWebp: z.string().nullable().optional(),
  imageCount: z.number().optional(),
  images: z.array(z.record(z.any())).optional(),
  colors: z.array(z.record(z.any())).optional(),
}).passthrough();

export const imagesFileSchema = z.array(imageSchema);
export type ImageRecord = z.infer<typeof imageSchema>;
