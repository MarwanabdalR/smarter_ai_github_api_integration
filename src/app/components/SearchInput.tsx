"use client"
import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export default function SearchInput(props: Props) {
  return (
    <form 
    action="" 
    method="GET" 
    onSubmit={props.onSubmit}
    className='flex justify-center items-center relative w-full mx-auto'>
      <div className='relative w-full'>
        <RiSearch2Line className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-400 text-xl z-10' />
        <input
          value={props.value}
          onChange={props.onChange}
          className='w-full h-14 pl-12 pr-20 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
          type="text"
          placeholder="Search GitHub username..."
        />
        <button
        className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-xl font-medium transition-colors duration-200 cursor-pointer'>
          Search
        </button>
      </div>
    </form>
  )
}