import { type Job } from "../app/types/types"

interface sidebarProps {
    sidebarOpen: boolean
    setOpen: (value: boolean) => void
    job: Job | null
}


export const Sidebar = ({ sidebarOpen, setOpen, job }: sidebarProps) => {
    return (
        <>
            {/* overlay clicable para cerrar sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
            <aside
                className={`
        fixed top-0 right-0 h-full w-2/3 bg-white z-50 p-6 rounded-tl-2xl rounded-bl-2xl lg:rounded-2xl flex flex-col justify-start items-center
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:static lg:translate-x-0 lg:h-auto lg:w-80
        `}
            >
                {/* Botón X solo en móvil */}
                <button
                    onClick={() => setOpen(false)}
                    className="cursor-pointer absolute top-4 right-4 lg:hidden text-xl font-bold"
                >
                    ✕
                </button>

                {/* Contenido del sidebar */}
                {!job && (
                    <>
                        <header className="flex flex-col items-center gap-2 mt-24">
                            <h3 className="font-medium text-xl">Detalles del trabajo</h3>
                            <p className="text-center">Clica algún trabajo para ver los detalles</p>
                        </header>
                        <section className="flex flex-col gap-2 items-center mt-auto mb-20">
                            <p>¿No sabes cómo empezar?</p>
                            <p>Te guiamos nosotros</p>
                        </section>
                    </>
                )}

                {job && (
                    <div className="flex flex-col gap-8 justify-start mt-12 overflow-y-auto">
                        <h2 className="font-medium text-xl text-left">{job.title}</h2>

                        <div className="flex flex-col gap-6">
                            <p><span className="font-medium">Compañia:</span> {job.company}</p>
                            <p><span className="font-medium">Localización:</span> {job.location}</p>
                            <p><span className="font-medium">Descripción del puesto:</span> {job.description}</p>
                            <p><span className="font-medium">Experiencia:</span> {job.experience_level}</p>
                            <p><span className="font-medium">Herramientas:</span> {job.tags.join(', ')}</p>
                            <p><span className="font-medium">Salario:</span> {job.salary_min} {job.salary_max ? `- ${job.salary_max}` : ''} {job.currency}</p>
                            <p><span className="font-medium">Publicado el:</span> {job.posted_at.split('-').reverse().join('-')}</p>
                            <p><span className="font-medium">Para postularte:</span> <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-main lg:hover:text-foreground lg:hover:underline transition duration-200">{job.url}</a></p>
                        </div>
                    </div>
                )}

            </aside>
        </>
    );
}