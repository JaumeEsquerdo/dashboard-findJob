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
        fixed top-0 right-0 h-full w-64 bg-white z-50 p-6 rounded-tl-2xl rounded-bl-2xl lg:rounded-2xl flex flex-col justify-start items-center
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:static lg:translate-x-0 lg:h-auto
        `}
            >
                {/* Botón X solo en móvil */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 lg:hidden text-xl font-bold"
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
                    <div className="flex flex-col gap-8 mt-12">
                        <h2 className="font-medium text-xl text-center">{job.title}</h2>
                        <p><span className="font-medium">Compañia:</span> {job.company}</p>
                        <p><span className="font-medium">Localización:</span> {job.location}</p>
                        <p><span className="font-medium">Descripción del puesto:</span> {job.description}</p>
                        <p><span className="font-medium">Herramientas:</span> {job.tags.join(', ')}</p>
                        <p><span className="font-medium">Salario:</span> {job.salary_min} {job.salary_max ? `- ${job.salary_max}` : ''} {job.currency}</p>
                        <p><span className="font-medium">Para postularte:</span> <span className="text-main">{job.url}</span></p>
                    </div>
                )}

            </aside>
        </>
    );
}