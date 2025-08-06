import React from "react";
import { FaStar } from "react-icons/fa";
import { tvGenres, movieGenres } from "@/app/utils/genres";
export default function SuggestionCard({
  id,
  title,
  poster,
  genres,
  rating,
  type,
}) {
  var genreNames = [];
  const idToNameOfGenre = (typeGenres) => {
    genreNames = genres
      ?.map((id) => {
        const genre = typeGenres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean);
  };

  if (type === "tv") {
    idToNameOfGenre(tvGenres);
  } else if (type === "movie") {
    idToNameOfGenre(movieGenres);
  }
  return (
    <a href={type==="tv"?`/serie/${id}`:`/movie/${id}`} className="flex flex-col space-y-3 min-w-[160px] h-[200px] md:min-w-[201px] md:h-[261px] border rounded-xl border-neutral-60 p-2 relative  w-[195px]   group md:hover:scale-105 overflow-hidden transition-all">
      <div
        className="bg-cover bg-top w-full h-[165px] rounded-md "
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${poster}')`,
        }}
      ></div>
      <div className="flex flex-col items-center w-full  space-y-1 ">
        <h1 className="font-semibold text-[12px] md:text-sm text-white  whitespace-nowrap  max-w-full truncate">
          {title}
        </h1>
        <div className="text-[10px] md:text-[12px] text-neutral-20 font-light text-center">
          {genreNames?.join(", ")}
        </div>
        <div className="text-white text-[9px] md:text-[12px] flex items-center gap-1">
          <FaStar className="text-primary-50" size={12} />
          {rating?.toFixed(1)}
          <span className="text-neutral-30">/10</span>
        </div>
      </div>
    </a>
  );
}
