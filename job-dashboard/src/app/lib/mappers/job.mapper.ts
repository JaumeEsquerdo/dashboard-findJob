import { ApiJob } from "../schemas/job.schema";
import { type Job } from "../../types/types";

export function mapApiJobToJob(apiJob: ApiJob): Job {
  return {
    id: apiJob.guid,
    title: apiJob.title,
    company: apiJob.companyName,
    location: apiJob.locations[0] ?? "Unknown",
    remote: apiJob.workModel.toLowerCase() === "remote",
    employment_type: apiJob.jobType,
    experience_level: apiJob.seniorityLevel,
    salary_min: apiJob.minSalary ?? 0,
    salary_max: apiJob.maxSalary ?? 0,
    currency: apiJob.currency,
    tags: apiJob.tags,
    posted_at: new Date(apiJob.pubDate * 1000),
    description: apiJob.description,
    url: apiJob.applicationLink,
  };
}
