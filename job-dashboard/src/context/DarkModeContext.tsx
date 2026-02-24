'use client'

import { createContext, useState, useEffect, ReactNode } from 'react'

interface DarkModeContextType {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

export const DarkModeContext = createContext<DarkModeContextType>({ isDarkMode: false, toggleDarkMode: () => { } })

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {

    const [isDarkMode, setIsDarkMode] = useState(() => {
        /* evitar q en Next.js se ejecute esto en el servidor */
        if (typeof window === 'undefined') return false

        /* si ha guardado dark-mode se pone en true */
        const savedMode = localStorage.getItem('dark-mode')
        if (savedMode !== null) {
            return savedMode === 'true'
        }

        /* si no hay nada guardado usa la preferencia del sistema */
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    useEffect(() => {
        const root = document.documentElement
        if (isDarkMode) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        localStorage.setItem('dark-mode', isDarkMode.toString())
    }, [isDarkMode])

    const toggleDarkMode = () => setIsDarkMode(prev => !prev)

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}