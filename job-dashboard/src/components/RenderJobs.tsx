import { type Job } from "../app/types/types";
import { useHelper } from "../context/useHelper";
import { useEffect, useRef } from "react";
import { useScroll } from "../context/useScrollContext";
type Props = {
    selectedJob: Job | null
    filteredJobs: Job[]
    setSelectedJob: (job: Job) => void
    setSidebarOpen: (boolean: boolean) => void
}

export const RenderJobs = ({ filteredJobs, setSelectedJob, setSidebarOpen, selectedJob }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const { step, endGuide } = useHelper()
    const { activeStep } = useScroll()

    useEffect(() => {
        if (activeStep === 3) {
            ref.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [activeStep])

    return (
        <>
            <div ref={ref} className="relative overflow-x-auto min-h-fit mt-8 rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                {step === 3 && (
                    <div className="absolute top-20 left-6 p-6 flex flex-col gap-2 bg-amber-50 w-80 rounded-2xl z-20">
                        <p>Y aquí verás todos los trabajos, o los filtrados. Clicando puedes consultar más detalles y solicitar empleo en su página web donde se ha subido la candidatura.</p>
                        <button className="bg-amber-200 w-full p-2 rounded-2xl" onClick={endGuide}>Cerrar</button>
                    </div>
                )}
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
                        {filteredJobs && filteredJobs.map((job) => (
                            <tr key={job.id} onClick={() => {
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
                                    {job.salary_min} - {job.salary_max} {job.currency}
                                </td>
                            </tr>
                        ))}

                        {filteredJobs.length === 0 && (
                            <tr>
                                <td className="p-6 text-center text-gray-500">
                                    No se han encontrado resultados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

