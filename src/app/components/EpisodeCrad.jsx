import React from "react";
import { FaStar } from "react-icons/fa";
export default function ({title, poster, rating}) {

  return (
    <div className={`relative bg-cover bg-center h-[180px] min-w-[150] md:h-[230px] md:min-w-[195px] rounded-xl  border-neutral-60 border group md:hover:scale-105 overflow-hidden transition-all`} 
     style={{
    backgroundImage: `url('https://image.tmdb.org/t/p/w500${poster}')`
  }}>
      <div className="absolute top-2 left-2 bg-neutral-80  text-white text-[10px] md:text-xs  px-2 py-1 rounded-full flex items-center gap-1 z-20">
        <FaStar className="text-primary-50" size={12} /> {rating.toFixed(1)}
        <span className="text-neutral-30">/ 10</span>
      </div>

      <div className="absolute p-3 text-white  bottom-0  text-center w-full bg-neutral-90/50  backdrop-blur-[4px] rounded-b-2xl z-20">
        <h3 className="text-[10px] md:text-sm font-light ">{title}</h3>
      </div>

      <div className="absolute opacity-0 group-hover:opacity-100 w-full h-full bg-black/20"></div>
    </div>
  );
}
