'use client'

import { createContext, useState, ReactNode } from 'react'

interface HelperContext {
    // isOpenHelper: boolean
    // setIsOpenHelper: React.Dispatch<SetStateAction<boolean>>
    // handleHelper: () => void
    step: number | null
    startGuide: () => void
    nextStep: () => void
    endGuide: () => void
}

export const HelperContext = createContext<HelperContext | undefined>(undefined)

export const HelperProvider = ({ children }: { children: ReactNode }) => {
    const [step, setStep] = useState<number | null>(null)

    const startGuide = () => {
        setStep(1)
    }

    const nextStep = () => {

        setStep((prev) => {
            if (prev === null) return null

            const next = prev + 1
            return next > 2 ? null : next
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


