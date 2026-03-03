'use client'
// import { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { useHelper } from '../context/useHelper';

const iconsNav = [
    { name: 'Home', src: '/Home.svg', href: '/' },
    { name: 'Sobre nosotros', src: '/About.svg', href: '/sobre-nosotros' },
    // { name: 'Ayuda', src: '/Help.svg' },
]

export const Navbar = () => {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext)
    const { startGuide, step, endGuide } = useHelper()

    /* asegurar q está montado antes de el render de la terneria de la img */
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true)
    }, [])


    return (
        <nav className="flex justify-between items-center w-full rounded-2xl bg-main p-6 lg:flex-col lg:max-w-1/12">
            <h1 className='text-white font-bold text-2xl'>findJob</h1>
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
                <li onClick={startGuide} className='relative'>
                    {step === 1 && (
                        <div className='absolute -top-22 -left-4 bg-amber-50 w-fit'>
                            <p>Ayuda abierto</p>
                            <p onClick={(e) => {
                                e.stopPropagation()
                                endGuide()
                            }
                            }>cerrar</p>
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

