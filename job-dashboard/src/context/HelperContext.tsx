'use client'

import { createContext, useState, ReactNode, SetStateAction } from 'react'

interface HelperContext {
    isOpenHelper: boolean
    setIsOpenHelper: React.Dispatch<SetStateAction<boolean>>
    handleHelper: () => void
}

export const HelperContext = createContext<HelperContext | undefined>(undefined)

export const HelperProvider = ({ children }: { children: ReactNode }) => {
    const [isOpenHelper, setIsOpenHelper] = useState(false)

    const handleHelper = () => {
        setIsOpenHelper(!isOpenHelper)
    }

    return (
        <HelperContext.Provider value={{ isOpenHelper, setIsOpenHelper, handleHelper }}>
            {children}
        </HelperContext.Provider>
    )
}