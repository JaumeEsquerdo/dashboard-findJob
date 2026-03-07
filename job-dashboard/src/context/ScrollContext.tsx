/**
 * Contexto para gestionar el estado de navegación de los pasos para poder realizar scroll en cada uno de ellos.
 * Permite sincronizar qué sección o "paso" está activo globalmente, 
 * facilitando la comunicación entre componentes de navegación y secciones de contenido.
 */
'use client'
import { ReactNode, createContext, useState } from 'react'

interface ScrollContextProps {
    activeStep: number
    setActiveStep: (step: number) => void
}

export const ScrollContext = createContext<ScrollContextProps | null>(null)

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
    const [activeStep, setActiveStep] = useState(0)

    return (
        <ScrollContext.Provider value={{ activeStep, setActiveStep }}>
            {children}
        </ScrollContext.Provider>
    )
}