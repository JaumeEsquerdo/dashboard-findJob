'use client'
// import { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

const iconsNav = [
    { name: 'Home', src: '/Home.svg', href: '/' },
    { name: 'Sobre nosotros', src: '/About.svg', href: '/sobre-nosotros' },
    // { name: 'Ayuda', src: '/Help.svg' },
]

export const Navbar = () => {
    const pathname = usePathname()
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext)

    // const [isOpen, setIsOpen] = useState(false);
    // const [isDesktop, setIsDesktop] = useState(false)

    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsDesktop(window.innerWidth > 1024)
    //     }

    //     handleResize()//iniciarlo la primera vez

    //     window.addEventListener('resize', handleResize)

    //     return () => {
    //         window.removeEventListener('resize', handleResize)
    //     }
    // }, [])

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
            <ul className='flex gap-1 fixed bottom-6 right-4 bg-main p-2 rounded-xl shadow-lg lg:flex col lg:relative lg:shadow-none lg:right-auto lg:bottom-auto lg:gap-2'>
                <li>
                    <Image className='cursor-pointer transform lg:hover:rotate-12 transition duration-100' src={'/Help.svg'} alt='botón de Ajustes' width={32} height={32} />
                </li>
                <li onClick={toggleDarkMode}>
                    <Image className='cursor-pointer transform lg:hover:rotate-12 transition duration-100' src={`${isDarkMode ? '/Moon.svg' : '/Sun.svg'}`} alt='botón de modo claro' width={32} height={32} />
                </li>
            </ul>
        </nav >
    );
}

