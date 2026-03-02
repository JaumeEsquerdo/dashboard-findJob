import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    LineChart, Line,
    Legend,
    Sector
} from "recharts"
import { type Job, type Seniority } from "../app/types/types"

type Props = {

    filteredJobs: Job[]
}

export const Metricas = ({ filteredJobs }: Props) => {
    const COLORS = ["#E1D7FF", "#BAA6FF", "#826DC7"]
    const seniorityOrder: Seniority[] = ["Junior", "Mid-level", "Senior"]


    /* cuantos trabajos por seniority */
    const seniorityCount = filteredJobs.reduce((acc, job) => {
        /* acc[job.experience_level] - para cada tipo */
        // Si el nivel ya existe en el acumulador, suma 1.
        // Si no existe, lo inicializa en 0 y luego suma 1.
        acc[job.experience_level] = (acc[job.experience_level] || 0) + 1
        return acc
    },
        {} as Record<string, number> //el inicio es un objeto vacio que tendrá claves tipo string y valores tipo number
    )


    const seniorityData = seniorityOrder
        .filter(level => seniorityCount[level] !== undefined) // solo niveles que existen
        .map(level => ({
            level,
            count: seniorityCount[level],
        }))

    /* trabajos remotos vs resto */
    const remoteData = [
        {
            name: "Remoto",
            value: filteredJobs.filter(job => job.remote).length,
        },
        {
            name: "In situ",
            value: filteredJobs.filter(job => !job.remote).length,
        },
    ]


    // Usa reduce para transformar el array en un objeto agrupado por seniority
    const senioritySalary = filteredJobs.reduce(
        // reduce recibe (acumulador, elementoActual) en cada iteración
        (acc, job) => {
            // Si el nivel aún no existe en el acumulador, lo inicializa
            if (!acc[job.experience_level as Seniority]) {
                acc[job.experience_level as Seniority] = { total: 0, count: 0 }
            }

            // Calcula el promedio salarial del job actual
            const avg = (job.salary_min + job.salary_max) / 2

            // Acumula el promedio en la propiedad 'total'
            acc[job.experience_level as Seniority].total += avg

            // Incrementa el contador para ese nivel
            acc[job.experience_level as Seniority].count += 1

            // Devuelve el acumulador para la siguiente iteración
            return acc
        },
        // Valor inicial del acumulador (se usa en la primera iteración)
        {} as Record<Seniority, { total: number; count: number }>
        // reduce recorre todo el array y retorna el acumulador final
    )



    // Creamos una constante llamada senioritySalaryData
    const senioritySalaryData =

        seniorityOrder
            .filter(level => senioritySalary[level]) // solo los que existen

            // Recorremos cada clave (cada nivel de seniority)
            .map(
                (level) => ({

                    // Creamos una propiedad llamada seniority
                    // cuyo valor es el nivel actual (ej: "junior")
                    seniority: level,

                    // Creamos la propiedad averageSalary
                    averageSalary:

                        // Comprobamos que count sea mayor que 0
                        // para evitar dividir entre 0
                        senioritySalary[level].count > 0

                            // Si hay datos, calculamos el promedio:
                            // total acumulado dividido entre cantidad
                            ? senioritySalary[level].total /
                            senioritySalary[level].count
                            // Si no hay datos, devolvemos 0
                            : 0,
                })
            )
    return (
        <>
            <div className="flex flex-col w-auto gap-4 h-fit lg:flex-row ">
                <div className="bg-white rounded-2xl w-full lg:w-1/2 min-h-65 flex justify-center items-center lg:min-h-70">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={seniorityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="level" />
                            <YAxis width={28} />
                            <Tooltip />
                            <Bar
                                dataKey="count"
                                shape={(props) => {
                                    const { x, y, width, height, index } = props
                                    return <rect x={x} y={y} width={width} height={height} fill={COLORS[index % COLORS.length]} />
                                }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl w-full lg:w-1/2 min-h-65 flex justify-center items-center lg:min-h-70">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={remoteData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                                shape={(props) => {
                                    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, index } = props
                                    return (
                                        <Sector
                                            cx={cx}
                                            cy={cy}
                                            innerRadius={innerRadius}
                                            outerRadius={outerRadius}
                                            startAngle={startAngle}
                                            endAngle={endAngle}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    )
                                }}
                            />

                            <Tooltip />
                            <Legend
                                content={(props) => {
                                    const { payload } = props
                                    return (
                                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                            {payload?.map((entry, index) => (
                                                <li key={`item-${index}`} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                    <div style={{ width: 12, height: 12, backgroundColor: COLORS[index % COLORS.length] }} />
                                                    <span>{entry.value}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl w-full lg:w-1/2  min-h-65 flex justify-center items-center lg:min-h-70">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={senioritySalaryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="seniority" />
                            <YAxis />
                            <Tooltip formatter={(value) => `€${Number(value).toLocaleString()}`} />
                            <Line
                                type="monotone"
                                dataKey="averageSalary"
                                stroke="#6366f1"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}
