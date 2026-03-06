'use client'
import Image from "next/image";
import { useState, useMemo } from "react";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/Button";
import { type Job } from "./types/types";
import dataJobs from '../data/jobs.json'
import { Metricas } from "../components/Metricas";
import { Kpis } from "../components/Kpis";
import { RenderJobs } from "../components/RenderJobs";
import { FiltrosSelects } from "../components/FiltrosSelects";
import { type Filters } from "../app/types/types";
import { motion, AnimatePresence, type Variants } from 'framer-motion'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(dataJobs.jobs)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [filters, setFilters] = useState<Filters>({
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

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }
  return (
    <div className="flex flex-col flex-1 min-h-0  lg:flex-row gap-6 overflow-x-hidden">

      <motion.main variants={container} initial='hidden' animate='show' layout className="flex flex-col flex-1 min-h-0 bg-fondoColor w-full p-4 rounded-2xl gap-4 overflow-y-auto scrollbar-hidden overflow-x-hidden">
        <header className="flex flex-col justify-between items-center gap-4 lg:flex-row">
          <h2 className="font-medium text-4xl text-textColor">Dashboard</h2>
        </header>

        {/* onboarding */}
        <AnimatePresence>
          {isOnboardingVisible && (
            <motion.div variants={item} exit={{ opacity: 0.4 }} transition={{ duration: 0.2 }} className="relative flex flex-col-reverse justify-between items-center p-4 lg:mt-6 rounded-2xl bg-whiteSpecial lg:flex-row lg:pr-8 lg:pl-8">
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* FILTROS */}
        <FiltrosSelects variants={item} filters={filters} uniqueLocations={uniqueLocations} setFilters={setFilters} />

        {/* KPIS render */}

        <Kpis variants={item} avgSalary={avgSalary} totalJobs={totalJobs} remotePercentage={remotePercentage} />

        {/* MÉTRICAS */}
        <Metricas variants={item} filteredJobs={filteredJobs} />

        {/* TABLA de RENDER JOBS */}
        <RenderJobs variants={item} filteredJobs={filteredJobs} setSelectedJob={setSelectedJob} setSidebarOpen={setSidebarOpen} selectedJob={selectedJob} />
      </motion.main >

      <Sidebar sidebarOpen={sidebarOpen} setOpen={setSidebarOpen} job={selectedJob} />
    </div >
  );
}
