import { tvGenres } from "@/app/utils/genres";

const VerticalCard = ({ item }) => {
  return (
    <div
      style={{
        backgroundImage: `url("${item?.imageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
      }}
      className="relative bg-cover h-[391px]  flex-shrink-0   group rounded-2xl overflow-hidden md:p-3 "
    >
      {/* Overlay for text content */}
      <div className="md:absolute h-[100%] md:h-auto  left-0 w-[100%] md:left-4 md:w-[70%] xl:w-[50%] bottom-0 md:bottom-3 bg-black/60 md:backdrop-blur-[2px] flex flex-col justify-end p-5 text-white rounded-2xl gap-y-2.5 ">
        {/* Title */}
        <h2 className="text-3xl font-extrabold  font-title">{item?.title}</h2>
        <div className="flex text-neutral-10 items-baseline flex-wrap gap-2">
          {/* IMDB Rating */}
          <div className="flex items-center ">
            <span className="bg-primary-50 text-black px-2  md:py-1 mr-1 rounded-md text-[12px] md:text-sm font-bold ">
              IMDb
            </span>
            <span className="font-bold">{item?.imdbRating?.toFixed(1)}</span>
          </div>
          {/* Genres */}
          <div className="text-sm md:text-md flex flex-nowrap whitespace-nowrap gap-x-1">
            {item?.genres
              ?.slice(0, 3)
              .map((genreId) => tvGenres.find((g) => g.id === genreId)?.name)
              .filter(Boolean)
              .map((name, index, arr) => (
                <>
                  {name}
                  {index < arr.length - 1 && (
                    <span className="text-primary-50"> | </span>
                  )}
                </>
              ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm font-light text-gray-200 leading-relaxed max-w-2xl h-[90px] overflow-ellipsis overflow-hidden ">
          {item?.description}
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="flex justify-center items-center bg-primary-50 text-sm md:text-md text-black font-semibold   rounded-sm hover:bg-transparent hover:border-primary-50 hover:border hover:text-primary-50 transition duration-300  w-[100px] h-[30px] md:w-[143px] md:h-[36px]"
          >
            WATCH
          </a>
          <a
            href="#"
            className="border group flex justify-center items-center text-sm md:text-md border-primary-50 text-primary-50 font-semibold  rounded-sm hover:bg-primary-50 hover:text-white transition duration-300  w-[100px] h-[30px] md:w-[143px] md:h-[36px]"
          >
            Trailer
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;
