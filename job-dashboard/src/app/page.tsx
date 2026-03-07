'use client'
import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/Button";
import { type Job } from "./types/types";
// import dataJobs from '../data/jobs.json'
import { Metricas } from "../components/Metricas";
import { Kpis } from "../components/Kpis";
import { RenderJobs } from "../components/RenderJobs";
import { FiltrosSelects } from "../components/FiltrosSelects";
import { type Filters } from "../app/types/types";
import { motion, AnimatePresence, type Variants, LayoutGroup } from 'framer-motion'
import { fetchJobs } from "./lib/api/fetchJobs";
import { ArrowUp } from "lucide-react"


export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mainRef = useRef<HTMLElement>(null);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    experience: '',
    location: '',
    remote: null
  })

  const [offset, setOffset] = useState(0); //cuantos ignora (y pasaa a mostrar los siguientes hasta el limite que digas)
  const [hasMore, setHasMore] = useState(true);

  const limit = 40; // cuantos jobs trae la API por fetch

  // Función para cargar la página actual
  const loadJobs = async () => {
    if (!hasMore || loading) return; // evitar cargas duplicadas

    setLoading(true);
    try {
      const newJobs = await fetchJobs(limit, offset);
      console.log('newJobs:', newJobs);
      setJobs(prev => [...prev, ...newJobs]); // sumamos nuevos jobs
      setOffset(prev => prev + newJobs.length);

      if (newJobs.length < limit) {
        setHasMore(false); // no hay más jobs disponibles
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  /* filtro localizaciones unicas */
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

      const matchesRemote =
        filters.remote === null || job.remote === filters.remote

      const matchesLocation =
        filters.location === '' ||
        job.location === filters.location

      return matchesSearch && matchesExperience && matchesLocation && matchesRemote
    })

  }, [jobs, filters.experience, filters.location, filters.search, filters.remote])

  /* KPIS */
  /* empleos totales filtrados */
  const totalJobs = filteredJobs.length

  /* porcentajos de trabajos remotos filtrados */
  const remoteJobs = filteredJobs.filter(job => job.remote).length
  const remoteJobsArray = filteredJobs.filter(job => job.remote)
  const remotePercentage = totalJobs === 0 ? 0 : Math.round((remoteJobs / totalJobs) * 100)

  /* salario medio */
  const filteredSalaries = filteredJobs.filter(
    job => (job.currency === 'EUR' || job.currency === 'USD') && job.salary_min !== null
  );

  const avgSalary =
    filteredSalaries.length === 0 ?
      0 : Math.round(filteredSalaries.reduce((acc, job) => acc + job.salary_min!, 0) / filteredSalaries.length)

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

  /* useEffect para detectar cuando mostrar btn para vovler arriba (por scroll) */
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      if (mainEl.scrollTop > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    }

    mainEl.addEventListener("scroll", handleScroll);
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, [])

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-full  lg:flex-row gap-6 overflow-x-hidden">
      <LayoutGroup>
        <motion.main ref={mainRef}
          variants={container} initial={'hidden'} animate='show' className=" relative flex flex-col flex-1 min-h-full bg-fondoColor w-full p-4 rounded-2xl gap-4 overflow-y-auto scrollbar-hidden overflow-x-hidden">



          <header className="flex flex-col justify-between items-center gap-4 lg:flex-row">
            <h2 className="font-medium text-4xl text-textColor">Dashboard</h2>
          </header>

          {/* onboarding */}
          <AnimatePresence initial={false}>
            {isOnboardingVisible && (
              <motion.div layout variants={item}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="relative flex flex-col-reverse justify-between items-center p-4 lg:mt-6 rounded-2xl bg-whiteSpecial lg:flex-row lg:pr-8 lg:pl-8">
                <div className="flex flex-col gap-5 justify-center items-center lg:items-start lg:max-w-1/2">
                  <h2 className="text-center text-xl font-medium text-textColor lg:text-start">Explora el mercado laboral tech en tiempo real</h2>
                  <p>Este dashboard recopila y organiza ofertas de empleo del sector tecnológico para que puedas visualizar tendencias, tecnologías más demandadas y oportunidades activas.</p>
                  <p>Filtra por stack, ubicación o modalidad y analiza el mercado con una perspectiva clara y estructurada.</p>
                  <Button onClick={handleClose}>Entendido</Button>
                </div>

                <Image className="lg:absolute lg:top-20 lg:right-4 xl:-top-14 xl:right-8
              -translate-y-4 lg:-translate-y-12
              lg:w-70
              xl:w-100 lg:h-auto" src={'/filtros-ilu.svg'} alt="Imagen de presentación" priority width={200} height={300} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* FILTROS */}
          <FiltrosSelects variants={item} filters={filters} remoteJobsArray={remoteJobsArray} uniqueLocations={uniqueLocations} setFilters={setFilters} />

          {/* KPIS render */}
          <Kpis variants={item} avgSalary={avgSalary} totalJobs={totalJobs} remotePercentage={remotePercentage} />


          {/* MÉTRICAS */}
          <Metricas variants={item} filteredJobs={filteredJobs} />

          {/* TABLA de RENDER JOBS */}
          <RenderJobs loadJobs={loadJobs} hasMore={hasMore} loading={loading} variants={item} filteredJobs={filteredJobs} setSelectedJob={setSelectedJob} setSidebarOpen={setSidebarOpen} selectedJob={selectedJob} />
          {/* Cargar más Jobs */}

        </motion.main >

      </LayoutGroup>
      <Sidebar sidebarOpen={sidebarOpen} setOpen={setSidebarOpen} job={selectedJob} />
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className=" cursor-pointer fixed bottom-6.5 right-1/4 md:right-1/5 lg:right-1/4 lg:bottom-11 z-50 bg-amber-200 p-3 rounded-full shadow-lg lg:hover:scale-105 lg:active:scale-95 transition duration-150"
          >
            <ArrowUp size={20} color="#7163ba" />
          </motion.button>
        )}
      </AnimatePresence>
    </div >
  );
}
