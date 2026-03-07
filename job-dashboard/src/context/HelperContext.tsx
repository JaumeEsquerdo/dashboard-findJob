/**
 * Contexto encargado de gestionar el estado de la guía interactiva (onboarding) del usuario.
 * Controla la navegación entre pasos y asegura que el usuario esté en la ruta correcta al iniciar.
 */

'use client'

import { createContext, useState, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
type Step = 1 | 2 | 3 | 4 | null


interface HelperContext {
    // isOpenHelper: boolean
    // setIsOpenHelper: React.Dispatch<SetStateAction<boolean>>
    // handleHelper: () => void
    step: Step
    startGuide: () => void
    nextStep: () => void
    endGuide: () => void
}

export const HelperContext = createContext<HelperContext | undefined>(undefined)

export const HelperProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [step, setStep] = useState<Step>(null)

    const startGuide = () => {
        if (pathname !== '/') {
            router.push('/')
        }
        setStep(1)
    }

    const nextStep = () => {
        setStep((prev) => {
            if (prev === 1) return 2
            if (prev === 2) return 3
            if (prev === 3) return 4
            if (prev === 4) return null
            return null
        })
    }

    const endGuide = () => {
        setStep(null)
    }

    // const handleHelper = () => {
    //     setIsOpenHelper(!isOpenHelper)
    // }
    return (
        <HelperContext.Provider value={{ startGuide, step, nextStep, endGuide }}>
            {children}
        </HelperContext.Provider>
    )
}


