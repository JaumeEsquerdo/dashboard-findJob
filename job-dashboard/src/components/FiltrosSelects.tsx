
import { type Filters } from "../app/types/types";
import { useHelper } from "../context/useHelper";
import { useScroll } from "../context/useScrollContext";
import { useRef, useEffect } from "react";
import { Button } from "./Button";

type Props = {
    filters: Filters
    uniqueLocations: string[]
    setFilters: (filter: Filters) => void
}

export const FiltrosSelects = ({ filters, uniqueLocations, setFilters }: Props) => {
    const { step, nextStep, endGuide } = useHelper()
    const { setActiveStep, activeStep } = useScroll()
    const ref = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
        if (activeStep === 2) {
            ref.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [activeStep])


    return (
        <div ref={ref} className="relative flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-center pt-4 mt-4">
            {step === 2 && (
                <div className="absolute top-32 left-6 p-6 flex flex-col gap-2 bg-amber-50 w-80 shadow-lg rounded-2xl z-20 lg:top-22 lg:gap-4">
                    <p>Aquí puedes filtrar tanto por palabras clave como por experiencia y/o localización.</p>
                    <Button className="w-full" bgColor="bg-amber-100" onClick={() => {
                        nextStep()
                        setActiveStep(3)
                    }
                    }>Siguiente paso</Button>
                    <Button className="w-full" bgColor="bg-amber-200" onClick={() => {
                        endGuide()
                        setActiveStep(0)
                    }}>Cerrar</Button>
                </div>
            )}
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

    );
}

