"use client";

import CardsSlider from "@/components/CardsSlider";
import GenresSlider from "@/components/GenresSlider";
import Hero from "@/components/hero";
import { TripeBanner } from "@/components/TripleBanner";
import { useState, useEffect } from "react";

const key = process.env.NEXT_PUBLIC_API_KEY;
export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dataOfTrendingMovies] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=en-US&page=1`
          ).then((res) => res.json()),
        ]);

        //handle trending movies
        const formattedTrendingMovies = dataOfTrendingMovies.results.map(
          (serie) => ({
            title: serie.title,
            year: serie.release_date?.slice(0, 4),
            rating: serie.vote_average,
            genres: serie.genre_ids,
            description: serie.overview,
            type:"movie",
            image: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
          })
        );
        setTrendingMovies(formattedTrendingMovies);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, []);
  return (
    <div className="flex flex-col gap-7 m-4">
      <Hero></Hero>
      <CardsSlider title={"Trending Movies"} data={trendingMovies} />
      <GenresSlider />
      <TripeBanner/>
    </div>
  );
}
