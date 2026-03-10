import { type Job } from "../app/types/types"
import Image from "next/image"
import { useHelper } from "../context/useHelper"
import { motion } from 'framer-motion'
import DOMPurify from "dompurify"
import { useEffect, useRef } from "react"

interface sidebarProps {
    sidebarOpen: boolean
    setOpen: (value: boolean) => void
    job: Job | null
}


export const Sidebar = ({ sidebarOpen, setOpen, job }: sidebarProps) => {
    const { step, startGuide } = useHelper()
    const scrollRef = useRef<HTMLDivElement>(null)

    /* logica para bloquear la pantalla si abre el sidebar y no está en desktop */
    useEffect(() => {
        const handleScrollLock = () => {
            const isMobile = window.innerWidth < 1024

            if (sidebarOpen && isMobile) {
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.overflow = "auto"
            }
        }

        handleScrollLock() //cálculo inicial
        window.addEventListener("resize", handleScrollLock)

        /* cleanup */
        return () => {
            window.removeEventListener("resize", handleScrollLock)
            document.body.style.overflow = "auto"
        }
    }, [job, sidebarOpen])

    /* para reiniciar el scroll de los detalles de job abiertos */
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0
        }

    }, [job, sidebarOpen])

    return (
        <>
            {/* overlay clicable para cerrar sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-60 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
            <aside
                className={`
        fixed top-0 right-0 h-full w-2/3 bg-white z-70 rounded-tl-2xl rounded-bl-2xl lg:rounded-2xl flex flex-col justify-start 
        transform transition-transform duration-600
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:static lg:translate-x-0 lg:h-auto lg:w-80
        `}
            >
                {/* Botón X solo en móvil */}
                <button
                    onClick={() => setOpen(false)}
                    className="cursor-pointer absolute top-4 right-4 lg:hidden text-xl font-bold p-2 rounded-2xl transition duration-200 active:shadow-md md:hover:shadow-md"
                >
                    ✕
                </button>

                {/* Contenido del sidebar */}
                {!job && (
                    <>
                        <header className="flex flex-col items-center gap-2 mt-24 p-4 lg:p-6">
                            <h3 className="font-semibold text-xl">Detalles del trabajo</h3>
                            <p className="text-center">Clica algún trabajo para ver los detalles</p>
                        </header>
                        <section className="flex flex-col gap-2 items-center mt-auto mb-20">
                            <p>¿No sabes cómo empezar?</p>
                            <div className='cursor-pointer transition duration-150 lg:hover:text-main' onClick={step === null ? startGuide : undefined}
                            >Te ayudamos nosotros
                            </div>
                        </section>
                    </>
                )}

                {job && (
                    <motion.div key={job.id} ref={scrollRef} initial={{ x: 0, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="flex flex-col gap-8 justify-start p-4 lg:p-6 mt-12 overflow-y-auto">
                        <h2 className="font-semibold text-xl text-left">{job.title}</h2>

                        <div className="flex flex-col gap-6">
                            <p><span className="font-semibold">Compañia:</span> {job.company}</p>
                            {job.companyLogo && (
                                <Image
                                    src={job.companyLogo}
                                    alt={`Logo de ${job.company}`}
                                    width={45}
                                    height={45}
                                    className="rounded-md object-contain opacity-0 transition-opacity duration-250"
                                    onLoad={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
                                    onError={(e) => e.currentTarget.style.display = 'none'}
                                />
                            )}
                            <p><span className="font-semibold">Localización:</span> {job.location}</p>
                            <p><span className="font-semibold">Experiencia:</span> {job.experience_level}</p>
                            <p><span className="font-semibold">Salario:</span>   {job.salary_min > 0 ? <>{job.salary_min} - {job.salary_max} {job.currency}</> : 'No indican salario'}</p>
                            <p><span className="font-semibold">Publicado el:</span> {job.posted_at.toLocaleDateString("es-ES")}</p>
                            <div className="mt-6 flex flex-col gap-2">
                                <h2 className="font-semibold">Herramientas:</h2>
                                <p>{job.tags.join(', ')}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="font-semibold">Descripción del puesto:</h2>
                                <div
                                    className="prose prose-sm sm:prose lg:prose-lg max-w-full"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}
                                />
                            </div>
                            <a href={job.url} target="_blank" rel="noopener noreferrer" className="shadow-[0_0_0_2px_var(--color-main)]
  hover:shadow-[0_0_0_2px_var(--color-main),0_4px_0_2px_var(--color-main)] lg:hover:-translate-y-1.5 transform focus:translate-0 lg:active:-translate-y-1 lg:active:shadow-[0_0_0_2px_var(--color-main),0_2px_0_2px_var(--color-main)] cursor-pointer px-4 py-2 rounded-2xl font-semibold transition bg-whiteSpecial text-main w-full text-center duration-150 lg:hover:bg-amber-100">Solicitar</a>
                        </div>
                    </motion.div>
                )}

            </aside >
        </>
    );
}