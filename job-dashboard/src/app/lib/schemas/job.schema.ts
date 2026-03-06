import { z } from "zod";

export const ApiJobSchema = z.object({
  title: z.string(),
  mainCategory: z.string(),
  companyName: z.string(),
  companyLogo: z.string().url(),
  jobType: z.string(),
  workModel: z.string(),
  seniorityLevel: z.string(),
  minSalary: z.number().nullable(),
  maxSalary: z.number().nullable(),
  currency: z.string(),
  locations: z.array(z.string()),
  tags: z.array(z.string()),
  description: z.string(),
  pubDate: z.number(),
  expiryDate: z.number(),
  applicationLink: z.string().url(),
  guid: z.string().url(),
});

export const ApiResponseSchema = z.object({
  usage: z.string(),
  updated_at: z.number(),
  offset: z.number(),
  limit: z.number(),
  total_count: z.number(),
  jobs: z.array(ApiJobSchema),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type ApiJob = z.infer<typeof ApiJobSchema>;
