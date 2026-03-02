'use client'
import Image from "next/image";
import { useState, useMemo } from "react";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/Button";
import { type Job, type Seniority } from "./types/types";
import dataJobs from '../data/jobs.json'
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
} from "recharts"




export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(dataJobs.jobs)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [filters, setFilters] = useState({
    search: '',
    experience: '',
    location: '',
  })
  const uniqueLocations = [...new Set(jobs.map(job => job.location))]

  /* Evita error en SSR(servidor) (donde no hay window). En cliente, muestra onboarding si no existe "onboardingSeen" en localStorage. */
  const [isOnboardingVisible, setIsOnboardingVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return !localStorage.getItem("onboardingSeenN");
  });

  const handleClose = () => {
    localStorage.setItem("onboardingSeen", "true")
    setIsOnboardingVisible(false)
  }

  /* filtrado del search */
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {

      const matchesSearch =
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase())


      const matchesExperience =
        filters.experience === '' ||
        job.experience_level === filters.experience

      const matchesLocation =
        filters.location === '' ||
        job.location === filters.location

      return matchesSearch && matchesExperience && matchesLocation
    })

  }, [jobs, filters.experience, filters.location, filters.search])

  /* KPIS */

  /* empleos totales filtrados */
  const totalJobs = filteredJobs.length

  /* porcentajos de trabajos remotos filtrados */
  const remoteJobs = filteredJobs.filter(job => job.remote).length
  const remotePercentage = totalJobs === 0 ? 0 : Math.round((remoteJobs / totalJobs) * 100)

  /* salario medio */
  const avgSalary =
    totalJobs === 0 ?
      0 : Math.round(filteredJobs.reduce((acc, job) => acc + job.salary_min, 0) / totalJobs)

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

  const seniorityData = Object.entries(seniorityCount).map(
    ([level, count]) => ({
      level,
      count,
    })
  )

  /* trabajos remotos vs resto */
  const remoteData = [
    {
      name: "Remote",
      value: filteredJobs.filter(job => job.remote).length,
    },
    {
      name: "Onsite",
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

    // Object.keys convierte el objeto senioritySalary en un array
    // con sus claves (ej: ["junior", "mid", "senior"])
    (Object.keys(senioritySalary) as Seniority[])
      // Le decimos a TypeScript que esas claves son del tipo Seniority[]
      // (porque por defecto las trata como string[])

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
    <div className="flex flex-col flex-1 min-h-0  lg:flex-row gap-6">

      <main className="flex flex-col flex-1 min-h-0 bg-fondoColor w-full p-4 rounded-2xl gap-4 overflow-y-auto scrollbar-hidden overflow-x-hidden">
        <header className="flex flex-col justify-between items-center gap-4 lg:flex-row">
          <h2 className="font-medium text-4xl text-textColor">Dashboard</h2>
        </header>

        {/* onboarding */}
        {isOnboardingVisible && (
          <div className="relative flex flex-col-reverse justify-between items-center p-4 lg:mt-12 rounded-2xl bg-whiteSpecial lg:flex-row lg:pr-8 lg:pl-8">
            <div className="flex flex-col gap-5 justify-center items-center lg:items-start lg:max-w-1/2">
              <h2 className="text-center text-xl font-medium text-textColor lg:text-start">Explora el mercado laboral tech en tiempo real</h2>
              <p>Este dashboard recopila y organiza ofertas de empleo del sector tecnológico para que puedas visualizar tendencias, tecnologías más demandadas y oportunidades activas.</p>
              <p>Filtra por stack, ubicación o modalidad y analiza el mercado con una perspectiva clara y estructurada.</p>
              <Button onClick={handleClose}>Entendido</Button>
            </div>


            <Image className="lg:absolute lg:top-20 lg:right-4 xl:-top-14 xl:right-8
              -translate-y-4 lg:-translate-y-12
              lg:w-70
              xl:w-100 lg:h-auto" src={'/filtros-ilu.svg'} alt="Imagen de presentación" width={200} height={300} />

          </div>
        )}

        {/* FILTROS */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-center mt-8">
          {/* input search */}
          <label className="relative block w-full">
            <input
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="p-3 rounded-2xl w-full bg-whiteSpecial outline-2 outline-main focus:outline-main focus:shadow-[0_0_0_2px_var(--color-main),0_4px_0_2px_var(--color-main)]  focus:outline-2 transition duration-100 " type="text" placeholder="Busca para consultar con precisión" />
            <span className="absolute cursor-pointer bg-background rounded-2xl p-1.5 right-4 top-1/2 -translate-y-1/2 text-main">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </label>
          {/* filtros selects */}
          <div className="flex gap-4 items-center justify-center w-full">
            <label className="relative w-full block lg:hover:-translate-y-1.5 transition duration-100">
              <select className="p-2 pr-4 cursor-pointer text-center rounded-2xl w-full bg-whiteSpecial outline-2 outline-main focus:outline-main focus:shadow-[0_0_0_2px_var(--color-main),0_4px_0_2px_var(--color-main)] hover:shadow-[0_0_0_2px_var(--color-main),0_4px_0_2px_var(--color-main)]  focus:outline-2 transition duration-100 appearance-none" value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })}>
                <option value="" >Experiencia</option>
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
              </select>
              <svg
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-main lg:right-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </label>


            <label className="relative w-full block lg:hover:-translate-y-1.5 transition duration-100">
              <select className="p-2 pr-4 cursor-pointer text-center rounded-2xl w-full bg-whiteSpecial outline-2 outline-main focus:outline-main focus:shadow-[0_0_0_2px_var(--color-main),0_4px_0_2px_var(--color-main)] hover:shadow-[0_0_0_2px_var(--color-main),0_4px_0_2px_var(--color-main)]  focus:outline-2 transition duration-100 appearance-none" value={filters.location} onChange={(e) => setFilters({
                ...filters, location: e.target.value
              })}>
                <option value="">Localización</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-main lg:right-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </label>

          </div>
        </div>

        {/* KPIS render */}

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

        <div className="flex flex-col w-auto gap-4 h-fit lg:flex-row ">
          <div className="bg-white rounded-2xl w-full lg:w-1/2 min-h-60 flex justify-center items-center lg:min-h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seniorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis width={25} />
                <Tooltip />
                <Bar fill='#7163ba' dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl w-full lg:w-1/2 min-h-60 flex justify-center items-center lg:min-h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  fill='#7163ba'
                  data={remoteData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl w-full lg:w-1/2  min-h-60 flex justify-center items-center lg:min-h-60">
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

        {/* tabla de render de jobs */}
        <div className="overflow-x-auto min-h-fit mt-4 rounded-2xl bg-white shadow-[0_0_0_2px_var(--color-main)]">
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




      </main >

      <Sidebar sidebarOpen={sidebarOpen} setOpen={setSidebarOpen} job={selectedJob} />
    </div >
  );
}
