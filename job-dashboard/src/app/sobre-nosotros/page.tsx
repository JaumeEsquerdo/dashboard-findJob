/**
 * ABOUT PAGE
 * 
 * Página informativa sobre la plataforma:
 * - Propósito: analizar el mercado laboral tech con datos reales de la API de Empllo.
 * - Experiencia: visualización interactiva con filtros y análisis de tendencias.
 * 
 * Motivación:
 * - Facilitar la búsqueda de empleo en tecnología.
 * - Ayudar a la toma de decisiones basada en datos.
 * 
 * Stack técnico:
 * - Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion
 * - Tecnologías renderizadas dinámicamente desde el array `techs`.
 * - Iconos con tooltip en desktop y nombre visible en móvil.
 * 
 * API y créditos:
 * - Datos obtenidos de la API pública de Empllo.
 * 
 * Perfil del desarrollador:
 * - Enlaces a LinkedIn, GitHub y portfolio personal.
 * 
 * Animaciones:
 * - Framer Motion: `container` para stagger, `item` para aparición (opacity + desplazamiento).
 * 
 * Otros:
 * - Diseño responsive con Tailwind CSS.
 * - Optimización de imágenes con `next/image`.
 */

'use client'
import Image from "next/image";
import { motion, type Variants } from 'framer-motion'

const techs = [
    { name: "React", icon: "/react.svg" },
    { name: "Next JS", icon: "/next.svg" },
    { name: "TypeScript", icon: "/typescript.svg" },
    { name: "Zod", icon: "/zod.svg" },
    { name: "Tailwind CSS", icon: "/tailwindcss.svg" },
    { name: 'Framer Motion', icon: '/motion.svg' },
    { name: 'Figma', icon: '/figma.svg' },
];

const container: Variants = {
    hidden: {},
    show: {
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.08
        }
    }
}

const item: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
}

const About = () => {
    return (
        <motion.main variants={container} initial='hidden' animate='show' className="flex flex-col justify-between flex-1 min-h-0 bg-fondoColor w-full p-4 rounded-2xl gap-6 overflow-y-auto scrollbar-hidden overflow-x-hidden SobreNosotrosDiv">
            <motion.header variants={item} className="flex flex-col justify-between items-center gap-4 lg:flex-row">
                <h2 className="font-medium text-4xl text-textColor">Sobre nosotros</h2>
            </motion.header>

            <motion.div variants={item} className="relative flex flex-col rounded-2xl bg-whiteSpecial lg:pr-8 lg:pl-8">

                <div className="flex flex-col gap-4 justify-center items-center lg:items-start p-4 lg:max-w-1/2">
                    <h2 className="text-center text-xl font-medium text-textColor lg:text-start">Análisis del mercado laboral tech en tiempo real</h2>
                    <p>Esta web ofrece un Dashboard interactivo diseñado para explorar el ecosistema laboral tecnológico utilizando <b>datos reales y actualizados</b> de la API de Empllo.</p>
                    <p>Nuestro objetivo es transformar el volumen de información del sector en una experiencia visual, fácil e interactiva. Mediante el procesado de datos, organizamos las ofertas de manera estructurada para que puedas filtrar por <b>stack, ubicación o años de experiencia</b> con total precisión.</p>
                </div>

                <Image className="static m-auto lg:absolute lg:top-1/2 lg:right-20
                           lg:-translate-y-1/2
                          lg:w-80
                          xl:w-100 lg:h-auto" src={'/business-ilu.svg'} alt="Imagen de presentación" width={300} height={400} />
                <div className="flex flex-col gap-4 justify-center items-center lg:items-start p-4 lg:max-w-1/2">
                    <h3 className="text-xl font-medium text-textColor ">¿Por qué utilizar esta plataforma?</h3>
                    <p>Sabemos que buscar trabajo puede ser abrumador. Por eso, hemos optimizado la visualización de los datos para eliminar el ruido y que vayas directo al grano: encontrar el puesto que mejor se ajuste a tus necesidades y solicitarlo de forma inmediata.</p>
                    <p>Gracias a la integración con la API de Empllo, centralizamos las mejores oportunidades tecnológicas, permitiéndote analizar tendencias y tomar decisiones informadas sobre tu carrera profesional de un solo vistazo.</p>
                </div>
            </motion.div>


            <motion.div variants={item} className="flex flex-col gap-4 lg:flex-row">
                <div className="relative flex flex-col w-full justify-between items-center p-4 rounded-2xl bg-whiteSpecial lg:p-8 lg:min-h-50">
                    <h2 className="text-center text-xl  font-medium text-textColor lg:text-start">Stack técnico de la creación de la web</h2>
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        {techs.map((tech) => (
                            <div key={tech.name} >
                                <div className="group relative w-16 h-16 m-2 flex justify-center items-center">
                                    <Image
                                        src={tech.icon}
                                        alt={tech.name}
                                        width={50}
                                        height={50}
                                        className="object-contain  w-12.5 h-12.5"
                                        priority
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
                <div className="relative flex flex-col w-full justify-between items-center p-4 gap-4 rounded-2xl bg-whiteSpecial lg:min-h-32 lg:p-8 lg:flex-row">
                    <div className="flex flex-col gap-4 justify-between items-center lg:m-auto">
                        <h2 className="text-center text-xl font-medium text-textColor lg:text-start">API y créditos</h2>
                        <div className="flex flex-col items-center">
                            <p>Fuente de datos: Empllo</p>
                            <p>Integración mediante su API de empleo tech.</p>
                            <a className="lg:hover:text-main transition duration-150" href="https://empllo.com/api" target="_blank" rel="noopener noreferrer">Enlace de la API</a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 items-center lg:m-auto">
                        <h2 className="text-center text-xl font-medium text-textColor lg:text-start">Mi perfil</h2>
                        <div className="flex flex-col items-center">

                            <a className="lg:hover:text-main transition duration-150" href="https://www.linkedin.com/in/jaume-esquerdo/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                            <a className="lg:hover:text-main transition duration-150" href="https://github.com/JaumeEsquerdo" target="_blank" rel="noopener noreferrer">Github</a>
                            <a className="lg:hover:text-main transition duration-150" href="https://portfolio-jaume-esquerdo.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.main >
    );
}

export default About;