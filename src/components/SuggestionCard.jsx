import React from 'react'
import { FaStar } from "react-icons/fa";
export default function SuggestionCard() {
  return (
    <div className="flex flex-col space-y-3 min-w-[201px] h-[261px] border rounded-xl border-neutral-60 p-2 relative  w-[195px]   group hover:scale-105 overflow-hidden transition-all">
        <div className="bg-[url('https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg')] bg-cover bg-center w-full h-[165px] rounded-md "></div>
        <div className="flex flex-col items-center w-full space-y-1 ">
            <h1 className="font-semibold text-[14px] text-white  text-overflow: ellipsis overflow-hidden whitespace-nowrap">The Lord of the Rings...</h1>
            <div className="text-[12px] text-neutral-20 font-light">Action, Drama, Adventure</div>
            <div className="text-white text-[12px] flex items-center gap-1">
                    <FaStar className="text-primary-50" size={12} /> 8.8
                    <span className="text-neutral-30 text-[10px]">/10</span>
                  </div>
        </div>
    </div>
  )
}
