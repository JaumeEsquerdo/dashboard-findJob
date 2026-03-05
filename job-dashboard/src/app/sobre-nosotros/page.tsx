import Image from "next/image";

const techs = [
    { name: "React", icon: "/react.svg" },
    { name: "Next JS", icon: "/next.svg" },
    { name: "TypeScript", icon: "/typescript.svg" },
    { name: "Tailwind CSS", icon: "/tailwindcss.svg" },
    { name: "Zod", icon: "/zod.svg" },
];

const About = () => {
    return (
        <main className="flex flex-col flex-1 min-h-0 bg-fondoColor w-full p-4 rounded-2xl gap-6 overflow-y-auto scrollbar-hidden overflow-x-hidden">
            <header className="flex flex-col justify-between items-center gap-4 lg:flex-row">
                <h2 className="font-medium text-4xl text-textColor">Sobre nosotros</h2>
            </header>

            <div className="relative flex flex-col-reverse justify-between items-center lg:min-h-60 p-4 lg:mt-12 rounded-2xl bg-whiteSpecial lg:flex-row lg:pr-8 lg:pl-8">
                <div className="flex flex-col gap-4 justify-center items-center lg:items-start lg:max-w-1/2">
                    <h2 className="text-center text-xl font-medium text-textColor lg:text-start">Análisis del mercado laboral tech en tiempo real</h2>
                    <p>Esta web muestra un Dashboard interactivo pensado para explorar el mercado laboral tecnológico a partir de datos estructurados de ofertas de empleo. Permite visualizar tendencias, tecnologías más demandadas y oportunidades activas mediante filtros por stack, ubicación o modalidad de trabajo.</p>
                    <p>Actualmente los datos mostrados son simulados (mock data), utilizados para desarrollar y validar la estructura y las visualizaciones del dashboard. El objetivo es integrar próximamente datos reales a través de una API pública de empleo, permitiendo analizar el mercado tech con información actualizada.</p>
                </div>

                <Image className="lg:absolute lg:top-20 lg:right-4 xl:-top-14 xl:right-8
                          -translate-y-4 lg:-translate-y-12
                          lg:w-70
                          xl:w-100 lg:h-auto" src={'/business-ilu.svg'} alt="Imagen de presentación" width={200} height={300} />
            </div>

            <div className="flex flex-col gap-4 lg:max-w-4/5 lg:mx-auto lg:my-auto">
                <h3 className="text-center text-xl font-medium text-textColor ">¿Por qué esta web?</h3>
                <p>El mercado laboral tecnológico cambia constantemente y muchas veces la información sobre tendencias, tecnologías demandadas o tipos de puestos aparece dispersa en diferentes portales de empleo. Este proyecto surge con la idea de reunir y estructurar esos datos para poder analizarlos de forma más clara.</p>
                <p>A través de la integración con APIs públicas de empleo, la plataforma busca centralizar información sobre ofertas tecnológicas y convertirla en visualizaciones que permitan entender mejor cómo evoluciona la demanda de perfiles tech.</p>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
                <div className="relative flex flex-col w-full justify-between items-center p-4 lg:mt-12 rounded-2xl bg-whiteSpecial lg:pr-8 lg:pl-8 lg:min-h-50">

                    <h2 className="text-center text-xl  font-medium text-textColor lg:text-start">🛠 Stack técnico de la creación de la web</h2>
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        {techs.map((tech) => (
                            <div key={tech.name} >
                                <div className="group relative w-16 h-16 m-2 flex justify-center items-center">
                                    <Image
                                        src={tech.icon}
                                        alt={tech.name}
                                        width={50}
                                        height={50}
                                        className="object-contain"
                                    />
                                    <span className="absolute  -bottom-10/12 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-main text-white text-xs px-2 py-2 font-medium rounded-xl opacity-0 lg:group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                        {tech.name}
                                    </span>
                                </div>
                                {/* Nombre fijo en móvil */}
                                <p className=" lg:hidden mt-2 text-sm font-medium text-center">
                                    {tech.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative flex flex-col w-full justify-between items-center p-4 lg:mt-12 rounded-2xl bg-whiteSpecial lg:pr-8 lg:pl-8 lg:min-h-32">
                    <h2 className="text-center text-xl font-medium text-textColor lg:text-start">Mi perfil</h2>
                    <p>ENLACES</p>
                </div>
            </div>
        </main>
    );
}

export default About;