import Image from "next/image";
import { motion, type Variants } from 'framer-motion'

type Props = {
    totalJobs: number
    remotePercentage: number
    avgSalary: number
    variants: Variants
}

export const Kpis = ({ totalJobs, remotePercentage, avgSalary, variants }: Props) => {

    return (

        <motion.div layout variants={variants} className="grid grid-cols-1 grid- md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {/* trabajos totales */}
            <div className="flex justify-between bg-whiteSpecial py-4 px-4 rounded-2xl shadow-md lg:px-6">
                <div className="flex flex-col justify-between">
                    <p className="text-sm text-gray-600">Trabajos totales</p>
                    <h3 className="text-3xl font-semibold text-textColor mt-2">{totalJobs}</h3>
                </div>
                <Image src="/icono-trabajos.svg" alt="icono búsqueda trabajo" width={80} height={80} />
            </div>
            <div className="flex justify-between bg-whiteSpecial py-4 px-4 rounded-2xl shadow-md lg:px-6">
                <div className="flex flex-col justify-between">
                    <p className="text-sm text-gray-600">Porcentaje trabajos remotos</p>
                    <h3 className="text-3xl font-semibold text-textColor mt-2">{remotePercentage}%</h3>
                </div>
                <Image src="/icono-remoto.svg" alt="icono búsqueda trabajo" width={80} height={80} />
            </div>
            <div className="flex justify-between bg-whiteSpecial py-4 px-4 rounded-2xl shadow-md lg:px-6">
                <div className="flex flex-col justify-between">
                    <p className="text-sm text-gray-600">Salario medio</p>
                    <h3 className="text-3xl font-semibold text-textColor mt-2">  {!isNaN(avgSalary) && avgSalary !== null ? avgSalary.toLocaleString() + "€" : "0€"}
                    </h3>
                </div>
                <Image src="/icono-salario.svg" alt="icono búsqueda trabajo" width={80} height={80} />
            </div>
        </motion.div>

    );
}