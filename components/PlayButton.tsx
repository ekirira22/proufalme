import React from 'react'
import { FaPlay } from 'react-icons/fa'

const PlayButton = () => {
  return (
    <button className='
        bg-orange-500 
        rounded-full 
        flex 
        items-center 
        p-2
        sm:p-4 
        drop-shadow-md
        translate
        translate-y-1/4
        opacity-0
        group-hover:opacity-100
        group-hover:translate-y-0
        transition 
        hover:scale-110
        min-h-[32px]
        min-w-[32px]
        sm:min-h-[48px]
        sm:min-w-[48px]
    '>
        <FaPlay className='text-black w-3 h-3 sm:w-4 sm:h-4' />
    </button>
  )
}

export default PlayButton