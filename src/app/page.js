"use client";

import CardsSlider from "@/app/components/CardsSlider.jsx";
import GenresSlider from "@/app/components/GenresSlider.jsx";
import Hero from "@/app/components/hero.jsx";
import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

const key = process.env.NEXT_PUBLIC_API_KEY;
export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const [dataOfTrendingMovies, dataOfTrendingSeries] = await Promise.all([
          axiosInstance.get("/trending/movie/day", {
            params: { language: "en-US", page: 1 },
          }),
          axiosInstance.get("/trending/tv/week", {
            params: { language: "en-US", page: 1 },
          }),
        ]);

        // axios returns data in `res.data`
        const formattedTrendingMovies = dataOfTrendingMovies.data.results.map(
          (movie) => ({
            id: movie.id,
            title: movie.title,
            year: movie.release_date?.slice(0, 4),
            rating: movie.vote_average,
            genres: movie.genre_ids,
            description: movie.overview,
            type: "movie",
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          })
        );

        const formattedTrendingSeries = dataOfTrendingSeries.data.results.map(
          (serie) => ({
            id: serie.id,
            title: serie.name,
            year: serie.first_air_date?.slice(0, 4), // Changed to first_air_date for TV shows
            rating: serie.vote_average,
            genres: serie.genre_ids,
            description: serie.overview,
            type: "tv",
            image: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
          })
        );

        setTrendingMovies(formattedTrendingMovies);
        setTrendingSeries(formattedTrendingSeries);
      } catch (err) {
        console.error(err);
      }
      finally{
        setLoading(false)
      }
    };

    fetchAll();
  }, []);
    if (loading) {
      return <LoadingSpinner />;
    }
  return (
    <div className="flex flex-col gap-7 m-4">
      <Hero></Hero>
      <CardsSlider title={"Trending Movies"} data={trendingMovies} />
      <GenresSlider />
      <CardsSlider title={"Trending Series"} data={trendingSeries} />
      {/* <TripeBanner/> */}
    </div>
  );
}
