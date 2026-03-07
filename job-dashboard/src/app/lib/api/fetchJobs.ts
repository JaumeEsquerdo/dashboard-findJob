import { type Job } from "../../types/types";
import { mapApiJobToJob } from "../mappers/job.mapper";
import { ApiResponseSchema } from "../schemas/job.schema";

/**
 * Función encargada de obtener los jobs desde nuestra API interna,
 * validar la respuesta con Zod y transformarla al modelo `Job`
 * que utiliza la aplicación.
 *
 * Flujo que sigue esta función:
 *
 * fetch API → validar con Zod → mapear datos → devolver Job[]
 *
 * Parámetros:
 * - limit: número máximo de jobs a pedir
 * - offset: desplazamiento para paginación
 *
 * Devuelve:
 * - Un array de `Job` ya normalizados para usar en la app.
 */
export async function fetchJobs(limit = 40, offset = 0): Promise<Job[]> {
  /**
   * Llamada a nuestra API route de Next.js.
   * Esta API route a su vez hace de proxy hacia la API externa.
   */
  const res = await fetch(`/lib/api/jobs?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const json = await res.json();

  /**
   * Validamos los datos usando el schema de Zod.
   *
   * Usamos `safeParse` en lugar de `parse` para evitar que
   * se lance una excepción automáticamente si la validación falla.
   *
   * En su lugar obtenemos un objeto con:
   * - success: boolean
   * - data o error
   */
  const parsed = ApiResponseSchema.safeParse(json);
  if (!parsed.success) {
    console.error(parsed.error);
    return [];
  }

  /**
   * Si la validación es correcta:
   *
   * - accedemos a parsed.data.jobs
   * - transformamos cada job de la API (`ApiJob`)
   *   al modelo interno (`Job`)
   *   usando el mapper.
   */
  return parsed.data.jobs.map(mapApiJobToJob);
}
