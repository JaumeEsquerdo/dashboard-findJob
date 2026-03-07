import { type Job } from "../app/types/types";
import { useHelper } from "../context/useHelper";
import { useEffect, useRef } from "react";
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
                                <th className="p-4 rounded-tl-2xl ">Título</th>
                                <th className="p-4">Compañia</th>
                                <th className="p-4">Localización</th>
                                <th className="p-4">Nivel</th>
                                <th className="p-4">Remoto</th>
                                <th className="p-4 rounded-tr-2xl">Salario</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredJobs && filteredJobs.map((job, index) => (
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
                    {filteredJobs.length > 0 && (
                        <div ref={btnRef} className={`relative flex justify-center my-8 ${step === 4 ? "pb-62" : ""}`}>
                            {step === 4 && (
                                <div className="absolute top-20 left-1/2 -translate-x-1/2 p-6 flex flex-col gap-2 bg-amber-50 w-80 shadow-lg rounded-2xl z-20 lg:top-14 lg:gap-4">
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
                </div>
            </motion.div>
        </>
    );
}

