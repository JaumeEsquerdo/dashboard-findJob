import { NextResponse } from "next/server";

/**
 * Handler para peticiones GET en esta API Route de Next.js.
 *
 * Cuando alguien hace una request a:
 *   /api/lo-que-sea?limit=40&offset=0
 *
 * Esta función se ejecuta en el servidor.
 *
 * Su objetivo es:
 * - Leer los query params (limit, offset)
 * - Llamar a la API externa (empllo)
 * - Devolver la respuesta al cliente
 *
 * En esencia actúa como un proxy entre el frontend y la API externa.
 */
export async function GET(req: Request) {
  /**
   * Creamos un objeto URL a partir de la request para poder
   * acceder fácilmente a los query parameters.
   */
  const { searchParams } = new URL(req.url);

  /**
   * Leemos los parámetros de paginación de la URL.
   * Si no vienen definidos usamos valores por defecto.
   *
   * Ejemplo:
   * /api/jobs?limit=20&offset=40
   */
  const limit = searchParams.get("limit") || "40";
  const offset = searchParams.get("offset") || "0";
  try {
    const res = await fetch(
      `https://empllo.com/api/v1?limit=${limit}&offset=${offset}`,
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch jobs" },
        { status: res.status },
      );
    }

    const data = await res.json();

    /**
     * Devolvemos los datos al cliente en formato JSON.
     * NextResponse.json crea automáticamente la Response
     * con los headers correctos.
     */
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
