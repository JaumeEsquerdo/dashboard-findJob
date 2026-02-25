'use client'
import Image from "next/image";
import { useState } from "react";

import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/Button";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnboardingVisible, setIsOnboardingVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return !localStorage.getItem("onboardingSeenN");
  });

  const handleClose = () => {
    localStorage.setItem("onboardingSeen", "true")
    setIsOnboardingVisible(false)
  }

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


        <div onClick={() => setSidebarOpen(!sidebarOpen)}>open sidebar</div>
        {sidebarOpen && <p>open</p>}
        <label>
          <input className="p-3 rounded-2xl bg-whiteSpecial outline-1 focus:outline-main active:outline-main active:outline-2 focus:outline-2" type="search" placeholder="Buscador" />
        </label>
      </main>
      <Sidebar sidebarOpen={sidebarOpen} setOpen={setSidebarOpen} />
    </div>
  );
}
