'use client'
// import { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { useHelper } from '../context/useHelper';
import { useScroll } from '../context/useScrollContext';
import { Button } from './Button';


const iconsNav = [
    { name: 'Home', src: '/Home.svg', href: '/' },
    { name: 'Sobre nosotros', src: '/About.svg', href: '/sobre-nosotros' },
    // { name: 'Ayuda', src: '/Help.svg' },
]

export const Navbar = () => {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext)
    const { setActiveStep } = useScroll()
    const { startGuide, step, endGuide, nextStep } = useHelper()

    /* asegurar q está montado antes de el render de la terneria de la img */
    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true)
    }, [])


    return (
        <nav className="flex justify-between items-center w-full rounded-2xl bg-main p-6 lg:flex-col lg:max-w-1/12">
            <h1 className='text-white font-bold text-2xl font-heading pointer-events-none'>findJob</h1>
            <ul className='flex flex-row gap-2 lg:flex-col  '>
                {iconsNav.map((icon) => {
                    const isActive = icon.href === pathname

                    return (
                        <li key={icon.name}>
                            <Link className={`flex items-center justify-center p-2 rounded-3xl transition-colors duration-200 ${isActive ? 'bg-navBarHover' : ''
                                } lg:hover:bg-navBarHover`}
                                href={icon.href}>
                                <Image src={icon.src} alt={`botón de ${icon.name}`} width={32} height={32} />
                            </Link>
                        </li>

                    )
                })}
            </ul>
            <ul className='flex gap-1 fixed bottom-6 right-4 bg-main p-2 z-20 rounded-xl shadow-lg lg:flex col lg:relative lg:shadow-none lg:right-auto lg:bottom-auto lg:gap-2'>
                <li onClick={step === null ? startGuide : undefined} className={`relative`}>
                    {step === 1 && (
                        <div className='absolute -top-60 -left-52 w-70 sm:-left-60 p-6 flex flex-col gap-2 bg-amber-50 sm:w-80 shadow-lg rounded-2xl lg:left-0 lg:gap-4'>
                            <p>Para entender más el flow de la app sigue este pequeño tutorial.</p>
                            <Button className='w-full' bgColor='bg-amber-100' onClick={(e) => {
                                e.stopPropagation()
                                nextStep()
                                setActiveStep(2)
                            }
                            }>Siguiente paso
                            </Button>
                            <Button className='w-full' bgColor='bg-amber-200' onClick={() => {
                                endGuide()
                                setActiveStep(0)
                            }}>Cerrar</Button>
                        </div>
                    )}
                    <Image className='cursor-pointer transform lg:hover:rotate-12 transition duration-100' src={'/Help.svg'} alt='botón de Ajustes' width={32} height={32} />
                </li>
                <li onClick={toggleDarkMode}>
                    {
                        mounted && (
                            <Image className='cursor-pointer transform lg:hover:rotate-12 transition duration-100' src={`${isDarkMode ? '/Moon.svg' : '/Sun.svg'}`} alt='botón de modo claro' width={32} height={32} />
                        )
                    }
                </li>
            </ul>
        </nav >
    );
}

