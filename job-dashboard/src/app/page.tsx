'use client'
import Image from "next/image";
import { useState, useMemo } from "react";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/Button";

import dataJobs from '../data/jobs.json'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState(dataJobs.jobs)
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


  return (
    <div className="flex flex-1 flex-col h-full  lg:flex-row gap-6">

      <main className="flex flex-col flex-1 bg-fondoColor p-4 rounded-2xl gap-4">
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


        {/* <div onClick={() => setSidebarOpen(!sidebarOpen)}>open sidebar</div>
        {sidebarOpen && <p>open</p>} */}
        <div className="flex flex-col lg:flex-row">
          <label className="relative block w-full lg:w-1/2 mt-8">
            <input
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="p-3 rounded-2xl w-full bg-whiteSpecial outline-2 outline-main focus:outline-main focus:shadow-[0_0_0_2px_var(--color-main),0_4px_0_2px_var(--color-main)] focus:outline-2 transition duration-100 " type="text" placeholder="Busca para consultar con precisión" />
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
          <select value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })}>
            <option value="">Nivel</option>
            <option value="Junior">Junior</option>
            <option value="Mid-level">Mid-level</option>
            <option value="Senior">Senior</option>
          </select>
          <select value={filters.location} onChange={(e) => setFilters({
            ...filters, location: e.target.value
          })}>
            <option value="">Localización</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* tabla de render de jobs */}
        <div className="overflow-x-auto">
          <p>Hay {filteredJobs.length} resultados</p>
          <table className="min-w-full bg-white runded-2xl shadow-md">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-4">Título</th>
                <th className="p-4">Compañia</th>
                <th className="p-4">Localización</th>
                <th className="p-4">Nivel</th>
                <th className="p-4">Remoto</th>
                <th className="p-4">Salario</th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs && filteredJobs.map((job) => (
                <tr key={job.id} className="border-t">
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
      </main>

      <Sidebar sidebarOpen={sidebarOpen} setOpen={setSidebarOpen} />
    </div>
  );
}
