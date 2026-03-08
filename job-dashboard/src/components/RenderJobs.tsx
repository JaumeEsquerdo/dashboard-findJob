import { type Job } from "../app/types/types";
import { useHelper } from "../context/useHelper";
import { useEffect, useRef, useState, useMemo } from "react";
import { useScroll } from "../context/useScrollContext";
import { Button } from "./Button";
import { motion, type Variants } from 'framer-motion'

type Props = {
    selectedJob: Job | null
    filteredJobs: Job[]
    setSelectedJob: (job: Job) => void
    setSidebarOpen: (boolean: boolean) => void
    variants: Variants
    loading?: boolean
    loadJobs: () => Promise<void>
    hasMore: boolean
}

export const RenderJobs = ({ filteredJobs, setSelectedJob, setSidebarOpen, selectedJob, variants, loading, loadJobs, hasMore }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const { step, endGuide, nextStep } = useHelper()
    const { activeStep, setActiveStep } = useScroll()
    const btnRef = useRef<HTMLDivElement | null>(null)
    const [sortBy, setSortBy] = useState<keyof Job | null>(null)
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

    /* PARAMS de ordenar columnas:
    - sortBy (columna seleccionada)
    - sortDir (dirección de orden) 
    */

    /* función para cambiar orden al clicar en la columna */
    const handleSort = (column: keyof Job) => {
        if (sortBy === column) {
            if (sortDir === 'desc') {
                // si ya estaba descendente, resetea
                setSortBy(null) // indicamos que ninguna columna está activa
                setSortDir('asc') // ponemos la dirección por defecto
            } else {
                setSortDir('desc')
            }
        } else {
            setSortBy(column)
            setSortDir('asc')
        }
    }

    /* crear lista ordenada */
    const sortedJobs = useMemo(() => {
        if (!sortBy) return filteredJobs //devuelve sin ordenar si no está siendo ordenado

        /* Se hace una copia de filteredJobs y valA y valB son los valores de la columna a ordenar en cada fila */
        return [...filteredJobs].sort((a, b) => {

            const valA = a[sortBy]
            const valB = b[sortBy]

            /* si alguno de los valores es null o undefined se pone al final de la tabla */
            if (valA == null) return 1
            if (valB == null) return -1

            /* Para strings usamos localeCompare para ordenar alfabéticamente */
            if (typeof valA === "string" && typeof valB === "string") {
                return sortDir === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA)
            }

            /* Para números */
            if (typeof valA === "number" && typeof valB === "number") {
                // si es la columna de salario_min
                if (sortBy === "salary_min") {
                    // ponemos 0 al final en asc
                    if (valA === 0) return 1
                    if (valB === 0) return -1
                }
                return sortDir === "asc" ? valA - valB : valB - valA
            }

            /* Para booleanos (true / false), los convertimos a número (true = 1, false = 0): */
            if (typeof valA === "boolean" && typeof valB === "boolean") {
                return sortDir === "asc"
                    ? Number(valB) - Number(valA)
                    : Number(valA) - Number(valB)
            }

            /* valor por defecto */
            return 0
        })
    }, [filteredJobs, sortBy, sortDir])


    /* scroll directo  para el paso 3 */
    useEffect(() => {
        if (activeStep === 3) {
            ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, [activeStep])

    /*scroll directo  para el paso 4 */
    useEffect(() => {
        if (activeStep === 4 && filteredJobs.length > 0) {
            btnRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [activeStep, filteredJobs.length])

    return (
        <>
            <motion.div layout variants={variants} ref={ref} className="relative overflow-y-visible h-auto min-h-100 mt-8 rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] lg:min-h-80">
                {step === 3 && (
                    <div className="absolute top-20 left-6 p-6 flex flex-col gap-2 bg-amber-50 w-80 shadow-lg rounded-2xl z-20 lg:top-12 lg:gap-4">
                        <p>Y aquí verás todos los trabajos, o los filtrados. Clicando puedes consultar más detalles y solicitar empleo en su página web donde se ha subido la candidatura.</p>

                        {filteredJobs.length > 0 && (
                            <Button className="w-full" bgColor="bg-amber-100" onClick={() => {
                                nextStep()
                                setActiveStep(4)
                            }
                            }>Siguiente paso</Button>
                        )}
                        <Button className="w-full" bgColor="bg-amber-200" onClick={() => {
                            endGuide()
                            setActiveStep(0)
                        }}>Cerrar</Button>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-2xl">
                        <thead className="bg-background text-left ">
                            <tr >
                                <th onClick={() => handleSort("title")} className="cursor-pointer p-4 rounded-tl-2xl whitespace-nowrap lg:hover:text-main lg:transition lg:duration-200">Título     <span className="inline-block w-3 text-center">
                                    {sortBy === "title" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                                </span>
                                </th>
                                <th onClick={() => handleSort("company")} className="cursor-pointer p-4 whitespace-nowrap lg:hover:text-main lg:transition lg:duration-200">Compañia     <span className="inline-block w-3 text-center">
                                    {sortBy === "company" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                                </span>
                                </th>
                                <th onClick={() => handleSort("location")} className="cursor-pointer p-4 whitespace-nowrap lg:hover:text-main lg:transition lg:duration-200">Localización     <span className="inline-block w-3 text-center">
                                    {sortBy === "location" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                                </span>
                                </th>
                                <th onClick={() => handleSort("experience_level")} className="cursor-pointer p-4 whitespace-nowrap lg:hover:text-main lg:transition lg:duration-200">Nivel     <span className="inline-block w-3 text-center">
                                    {sortBy === "experience_level" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                                </span>
                                </th>
                                <th onClick={() => handleSort("remote")} className="cursor-pointer p-4 whitespace-nowrap lg:hover:text-main lg:transition lg:duration-200">Remoto     <span className="inline-block w-3 text-center">
                                    {sortBy === "remote" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                                </span>
                                </th>
                                <th onClick={() => handleSort("salary_min")} className="cursor-pointer p-4 rounded-tr-2xl whitespace-nowrap lg:hover:text-main lg:transition lg:duration-200">Salario     <span className="inline-block w-3 text-center">
                                    {sortBy === "salary_min" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                                </span>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredJobs && sortedJobs.map((job, index) => (
                                <tr key={`${job.id}-${index}`} onClick={() => {
                                    setSelectedJob(job)
                                    setSidebarOpen(true)
                                }} className={`border-t border-gray-300 cursor-pointer transition duration-200 ${job === selectedJob ? 'bg-main text-whiteSpecial' : 'lg:hover:bg-fondoColor'}`}>
                                    <td className="p-4 font-medium">{job.title}</td>
                                    <td className="p-4">{job.company}</td>
                                    <td className="p-4">{job.location}</td>
                                    <td className="p-4">{job.experience_level}</td>
                                    <td className="p-4">
                                        {job.remote ? 'Si' : 'No'}
                                    </td>
                                    <td className="p-4">
                                        {job.salary_min > 0 ? <>{job.salary_min} - {job.salary_max} {job.currency}</> : 'No indican salario'}

                                    </td>
                                </tr>
                            ))}

                            {filteredJobs.length === 0 && (
                                <tr>
                                    <td className="p-6 font-medium text-gray-500">
                                        No se han encontrado resultados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {filteredJobs.length > 0 && (
                    <div ref={btnRef} className={`relative flex justify-center pb-30 my-8 ${step === 4 ? "pb-62" : ""}`}>
                        {step === 4 && (
                            <div className="absolute top-14 left-1/2 -translate-x-1/2 p-6 flex flex-col gap-2 bg-amber-50 w-80 shadow-lg rounded-2xl lg:top-14 lg:gap-4 z-99">
                                <p>Por último, si quieres ver más datos, al final de la lista de trabajos encontrarás
                                    un botón para cargar más. Puedes seguir pulsándolo hasta ver todos los trabajos disponibles.</p>
                                <Button className="w-full" bgColor="bg-amber-200" onClick={() => {
                                    endGuide()
                                    setActiveStep(0)
                                }}>Cerrar</Button>
                            </div>
                        )}
                        <Button onClick={loadJobs} disabled={loading || !hasMore}>
                            {loading ? 'Cargando...' : hasMore ? 'Cargar más' : 'No hay más'}
                        </Button>
                    </div>
                )}
            </motion.div>
        </>
    );
}

