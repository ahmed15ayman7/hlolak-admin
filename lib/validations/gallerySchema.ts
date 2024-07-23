// src/schemas/gallery-schema.ts
import { z } from 'zod';

export const gallerySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  imageUrl: z.string().url('Invalid URL'),
});

export type GalleryFormValues = z.infer<typeof gallerySchema>;

export const opinianSchema = z.object({
  title: z.string().min(1, 'هام'),
  text: z.string().min(5, 'رايك لا يقل عن خمسة حروف').max(150,"رايك لا يزيد عن ١٥٠ حرف"),
});

export type OpinianFormValues = z.infer<typeof opinianSchema>;
export const offersSchema = z.object({
  title: z.string().min(1, 'هام'),
  text: z.string().min(5, 'رايك لا يقل عن خمسة حروف').max(150,"رايك لا يزيد عن ١٥٠ حرف"),
  imageUrl: z.string().url('الصوره هامه'),
});

export type OffersFormValues = z.infer<typeof offersSchema>;
export const blogSchema = z.object({
  imageUrl: z.string().url('الصوره هامه'),
  title: z.string().min(1, 'هام'),
  text: z.string().min(5, 'المدونه لا تقل عن خمسة حروف').max(150,"المدونه لا تزيد عن ١٥٠ حرف"),
});

export type BlogFormValues = z.infer<typeof blogSchema>;


