import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";

export default function ArtistCard({ id, profile, name }) {
  const [personRoles, setPersonRoles] = useState([]);
  const [numberOFProjects, setNumberOFProjects] = useState(0);
  
  useEffect(() => {
    async function getActorRoles() {
      try {
        const res = await axiosInstance.get(`/person/${id}/combined_credits`);
        const { cast, crew } = res.data;

        const roles = new Set();

        if (cast && cast.length > 0) roles.add("Actor");

        crew.forEach((c) => {
          if (c.job === "Producer" || c.job === "Director") {
            roles.add(c.job);
          }
        });

        const finalRoles = Array.from(roles);
        const numProjects = (cast?.length || 0) + (crew?.length || 0);
        setNumberOFProjects(numProjects);
        setPersonRoles(finalRoles);
      } catch (err) {
        console.error("Failed to fetch roles:", err);
      }
    }

    getActorRoles();
  }, [id]);

  return (
    <a href={`/artist/${id}`}
      className="relative min-w-[180px] min-h-[240px]  bg-cover bg-top rounded-xl cursor-pointer overflow-hidden group scale-100 hover:scale-105 transition-all "
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/w185${profile}')`,
      }}
    >
      {personRoles && (
        <div className="flex flex-nowrap absolute top-2 left-2 space-x-0.5 z-10">
          {personRoles.map((role,index) => {
            return (
              <div  key={index} className="bg-black/60 px-2 py-1 rounded-full font-light text-white text-[12px] ">
                {role}
              </div>
            );
          })}
        </div>
      )}
      <div className="h-[60px] absolute w-full bottom-0 bg-black/50  backdrop-blur-[2px] text-center content-center z-10">
        <h2 className="text-[12px] font-semibold">{name}</h2>
        <p className="text-[10px] font-normal text-neutral-10">
          {numberOFProjects} movies
        </p>
      </div>
      <div className="w-full h-full bg-transparent group-hover:bg-black/20"></div>
    </a>
  );
}
