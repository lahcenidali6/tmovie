import React from "react";

export default function ArtistCardSkeleton() {
  return (
    <div className="relative min-w-[180px] min-h-[240px] bg-cover bg-top rounded-xl overflow-hidden bg-neutral-70 animate-pulse ">
      <div className="flex flex-nowrap absolute top-2 left-2 space-x-0.5 z-10">
        <div className="bg-neutral-80 w-[3rem] h-[1rem] rounded-full font-light text-white text-[12px] "></div>
        <div className="bg-neutral-80 w-[3rem] h-[1rem] rounded-full font-light text-white text-[12px] "></div>
        <div className="bg-neutral-80 w-[3rem] h-[1rem] rounded-full font-light text-white text-[12px] "></div>
      </div>
      <div className="h-[60px] absolute w-full bottom-0 bg-neutral-80  backdrop-blur-[2px] flex flex-col items-center justify-evenly  z-10">
        <div className="bg-neutral-60 w-[5rem] h-4 rounded-full"></div>
        <div className="bg-neutral-60 w-[7rem] h-3 rounded-full"></div>
      </div>
      <div className="w-full h-full bg-transparent group-hover:bg-black/20"></div>
    </div>
  );
}
