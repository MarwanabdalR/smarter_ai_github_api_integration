"use client"
import React from 'react'
import { useTheme } from 'next-themes'
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

type Props = {}

export default function DarkAndLightButton({ }: Props) {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <button
            onClick={toggleTheme}
            className='flex justify-center items-center gap-2 font-normal cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors text-xl'
        >
            {theme === 'dark' ? (
                <>
                    <p>Light</p>
                    <IoSunnyOutline className="w-5 h-5" />
                </>
            ) : (
                <>
                    <p>Dark</p>
                    <IoMoonOutline className="w-5 h-5" />
                </>
            )}
        </button>
    )
}