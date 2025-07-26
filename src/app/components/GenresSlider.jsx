import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import ItemCardSkeleton from "./skeletons/ItemCardSkeleton";
import { movieGenres } from "@/app/utils/genres";

const key = process.env.NEXT_PUBLIC_API_KEY;

const GenresSlider = () => {
  const [genreIndex, setGenreIndex] = useState(28);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getByGenre = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreIndex}&language=en-US&page=1`
        );
        const data = await res.json();

        const formattedMovies = data.results?.map((movie) => ({
          id: movie.id,
          year: movie.release_date?.slice(0, 4),
          description: movie.overview,
          title: movie.title,
          genres: movie.genre_ids,
          rating: movie.vote_average,
          type: "movie",
          image: `https://image.tmdb.org/t/p/w500${
            movie.poster_path || movie.backdrop_path
          }`,
        }));
        setData(formattedMovies);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getByGenre();
  }, [genreIndex]);

  return (
    <div className="text-white flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-bold font-title">Genres</h2>
        <a href="#" className="text-white flex items-center gap-1">
          View All <span className="text-primary-50 font-bold">→</span>
        </a>
      </div>

      <div className="hidden lg:flex gap-2 text-[18px] text-neutral-30 font-medium flex-wrap">
        {movieGenres.slice(0, 7).map((genre) => (
          <div
            key={genre.id}
            className={`cursor-pointer p-2 rounded-md transition duration-500 ease-in-out ${
              genre.id == genreIndex
                ? "bg-primary-50 text-neutral-90"
                : "hover:text-primary-50"
            }`}
            onClick={() => setGenreIndex(genre.id)}
          >
            {genre.name}
          </div>
        ))}
      </div>
        <select onChange={(e)=>setGenreIndex(e.target.value)} className="block lg:hidden text-[18px] w-fit text-neutral-30 font-medium col-1">
        {movieGenres.slice(0, 7).map((genre) => (
          <option
            key={genre.id}
            className={`p-2  text-neutral-90`}
            value={genre.id}
          >
            {genre.name}
          </option>
        ))}
      </select>


      {/* Slider or Skeletons */}
      <div
        className="flex space-x-4 py-4 w-full overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ItemCardSkeleton key={index} />
            ))
          : data?.map((movie) => (
              <ItemCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                genres={movie.genres}
                rating={movie.rating}
                description={movie.description}
                type={movie.type}
                image={movie.image}
              />
            ))}
      </div>
    </div>
  );
};

export default GenresSlider;
