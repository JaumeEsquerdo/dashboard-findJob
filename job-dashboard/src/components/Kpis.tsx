import Image from "next/image";

type Props = {
    totalJobs: number
    remotePercentage: number
    avgSalary: number
}

export const Kpis = ({ totalJobs, remotePercentage, avgSalary }: Props) => {

    return (

        <div className="grid grid-cols-1 grid- md:grid-cols-3 gap-6 mt-8">
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
                    <h3 className="text-3xl font-semibold text-textColor mt-2">{avgSalary.toLocaleString()}€</h3>
                </div>
                <Image src="/icono-salario.svg" alt="icono búsqueda trabajo" width={80} height={80} />
            </div>
        </div>

    );
}