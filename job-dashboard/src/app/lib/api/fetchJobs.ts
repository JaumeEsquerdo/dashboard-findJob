import { type Job } from "../../types/types";
import { mapApiJobToJob } from "../mappers/job.mapper";
import { ApiResponseSchema } from "../schemas/job.schema";

export async function fetchJobs(limit = 40, offset = 0): Promise<Job[]> {
  const res = await fetch(`/lib/api/jobs?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const json = await res.json();
  const parsed = ApiResponseSchema.safeParse(json);
  if (!parsed.success) {
    console.error(parsed.error);
    return [];
  }
  return parsed.data.jobs.map(mapApiJobToJob);
}
