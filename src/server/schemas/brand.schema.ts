import { z } from "zod";

export const brandSchema = z.object({
  id: z.string().min(1),
  brandId: z.union([z.number(), z.string()]).optional().nullable(),
  name: z.string().min(1),
  slug: z.string().min(1),
  logo: z.string().nullable().optional(),
  modelCount: z.number().optional(),
  upcomingCount: z.number().optional(),
  rating: z.number().nullable().optional(),
  url: z.string().nullable().optional(),
}).passthrough();

export const brandsFileSchema = z.array(brandSchema);

export type BrandRecord = z.infer<typeof brandSchema>;
