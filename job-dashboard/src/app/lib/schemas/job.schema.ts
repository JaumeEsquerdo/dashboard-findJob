import { z } from "zod";

/**
 * Schema de Zod que define la estructura de UN job que viene de la API externa.
 *
 * Sirve para:
 * 1. Validar en runtime que los datos recibidos tienen la forma esperada.
 * 2. Garantizar que cada propiedad tiene el tipo correcto.
 *
 * Si al parsear datos alguno de estos campos no coincide (ej: un number donde
 * esperamos string), Zod lanzará un error.
 */

export const ApiJobSchema = z.object({
  title: z.string(),
  mainCategory: z.string(),
  companyName: z.string(),
  companyLogo: z.string().url().nullable().optional(),
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

/**
 * Schema que define la estructura de la respuesta COMPLETA de la API.
 *
 * La API no devuelve solo jobs, sino también metadata (paginación, uso, etc).
 * Este schema valida toda la respuesta y reutiliza `ApiJobSchema`
 * para validar cada job dentro del array `jobs`.
 */
export const ApiResponseSchema = z.object({
  usage: z.string(),
  updated_at: z.number(),
  offset: z.number(),
  limit: z.number(),
  total_count: z.number(),
  jobs: z.array(ApiJobSchema),
});

/**
 * Tipo TypeScript inferido automáticamente a partir del schema de Zod.
 *
 * Esto evita tener que duplicar tipos manualmente.
 * Si el schema cambia, el tipo también se actualiza automáticamente.
 *
 * Representa la respuesta validada de la API.
 */
export type ApiResponse = z.infer<typeof ApiResponseSchema>;

/**
 * Tipo TypeScript inferido para un solo Job.
 *
 * Este tipo se suele usar después de validar los datos para trabajar
 * con ellos dentro de la aplicación con tipado seguro.
 */
export type ApiJob = z.infer<typeof ApiJobSchema>;
