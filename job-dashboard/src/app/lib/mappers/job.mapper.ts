import { ApiJob } from "../schemas/job.schema";
import { type Job } from "../../types/types";

/**
 * Convierte (mapea) un Job recibido desde la API externa
 * al modelo interno `Job` que utiliza nuestra aplicación.
 *
 * Esto es útil porque:
 * - Las APIs externas suelen tener estructuras distintas a las nuestras.
 * - Nos permite normalizar nombres de campos y tipos.
 * - Evita que el resto de la app dependa directamente del formato de la API.
 *
 * Recibe:
 *  - apiJob: un job ya validado por Zod con el tipo `ApiJob`.
 *
 * Devuelve:
 *  - un objeto con la estructura `Job` que usa nuestra aplicación.
 */
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
    companyLogo: apiJob.companyLogo || undefined,
  };
}
