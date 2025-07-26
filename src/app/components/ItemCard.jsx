import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { tvGenres, movieGenres } from "@/app/utils/genres";

export default function ItemCard({
  id,
  title,
  year,
  description,
  genres,
  rating,
  image,
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

  if (type == "tv") {
    idToNameOfGenre(tvGenres);
  } else if (type == "movie") {
    idToNameOfGenre(movieGenres);
  }
  return (
    <a href={type==="tv"?`/serie/${id}` : `/movie/${id}`} className="relative cursor-pointer group bg-neutral-80 rounded-lg  overflow-hidden p-2 md:hover:scale-110 z-20 transition min-w-[169px] min-h-[229px] lg:min-w-[193px] lg:min-h-[262px]  ">
      <div className="relative rounded-lg overflow-hidden w-full h-full">
        <div className="overflow-x-hidden relative w-full aspect-[2/3]">
          {/* hover box */}
          <div className="absolute  bottom-0 opacity-0 group-hover:opacity-100 flex flex-col  bg-black/80   items-center justify-center text-[12px]  text-white w-full h-full z-10 text-center px-2 transition duration-400">
            <div className="font-extralight max-h-[50%]   text-ellipsis  overflow-hidden">
              {description}
            </div>
            <div className="absolute bottom-2">
              <div className="font-bold text-[14px]">{title}</div>
              <div>({year})</div>
            </div>
          </div>
          <Image
            src={image}
            alt={title || "Poster image" }
            fill
            sizes={"100%"}
            priority
            className="rounded-t-lg object-cover  "
          />
        </div>

        <div className="absolute top-2 left-2 bg-neutral-80  text-white text-xs  px-2 py-1 rounded-full flex items-center gap-1">
          <FaStar className="text-primary-50" size={12} /> {rating?.toFixed(1)}
          <span className="text-neutral-30">/ 10</span>
        </div>
        <div className="absolute top-0 right-0 text-white  p-2 rounded-md bg-neutral-70 z-20 ">
          <BsHeartFill className="text-neutral-10 hover:text-red-500 hover:drop-shadow-[0_0_8px_red] hover:shadow-lg transition" />
        </div>
        <div className="absolute p-3 text-white  bottom-0  text-center w-full bg-neutral-90/50  backdrop-blur-[2px] rounded-b-md">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-gray-400 whitespace-nowrap">
            {genreNames?.join(", ")}
          </p>
        </div>
        {/* corner effect elements */}
        <div className="absolute w-[37px] h-[37px] bg-neutral-80 right-0 top-0 rounded-bl-md z-10"></div>
        <div className="absolute w-[40px] h-[20px] bg-transparent right-[37px] top-0 rounded-tr-md z-10 shadow-[4px_-4px_1px_#333333]"></div>
        <div className="absolute w-[20px] h-[40px] bg-transparent right-0 top-[37px] rounded-tr-md z-10 shadow-[4px_-4px_1px_#333333]"></div>
      </div>
    </a>
  );
}
