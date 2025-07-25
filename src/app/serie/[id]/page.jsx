"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Flag,
  CalendarDays,
  Languages,
  Server,
  Clapperboard,
  Clock,
  Users,
  ArrowRight,
  ListFilter,
  ThumbsUp,
} from "lucide-react";
import EpisodeCrad from "@/app/components/EpisodeCrad";
import SuggestionCard from "@/app/components/SuggestionCard";
import { axiosInstance } from "@/lib/axios";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function page({ params }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [stars, setStars] = useState([]);
  const [menu, setMenu] = useState("informations");
  const [numberOfSeasons, setNumberOfSeasons] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  //scroll states
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  //more like this state
  const [moreData, setMoreData] = useState([]);
  //reviews state
  const [reviewData, setReviewData] = useState([]);
  const [sortReview, setSortReview] = useState("newest")

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [dataRes, creditsRes, moreRes] = await Promise.all([
          axiosInstance.get(`/tv/${id}`, { params: { language: "en-US" } }),
          axiosInstance.get(`/tv/${id}/credits`),
          axiosInstance.get(`/tv/${id}/similar`, {
            params: { language: "en-US", page: 1 },
          }),
        ]);

        const data = dataRes.data;
        const credits = creditsRes.data;
        setMoreData(moreRes.data.results);
        const formatted = {
          name: data.name,
          year: data.first_air_date
            ? new Date(data.first_air_date).getFullYear()
            : "N/A",
          overview: data.overview,
          genres: data.genres || [],
          posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          backdropUrl: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
          country:
            data.origin_country && data.origin_country.length > 0
              ? data.origin_country[0]
              : "Unknown",
          releaseDate: data.first_air_date || "Unknown",
          language: data.original_language || "Unknown",
          network:
            data.networks && data.networks.length > 0
              ? data.networks[0].name
              : "Unknown",
          director: data.created_by?.[0]?.name || "N/A",
          runtime: data.episode_run_time?.[0]
            ? data.episode_run_time[0] + " min"
            : "N/A",
          imdbRating: data.vote_average.toFixed(1),
          seasons: data.number_of_seasons,
        };
        setData(formatted);
        setNumberOfSeasons(formatted.seasons);
        setStars(credits.cast);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    async function getEpisodes() {
      try {
        const episodesRes = await axiosInstance.get(
          `/tv/${id}/season/${selectedSeason}`
        );
        const episodesData = episodesRes.data.episodes;
        setEpisodes(episodesData);
      } catch (err) {
        console.error(err);
      }
    }
    getEpisodes();
  }, [selectedSeason]);

  //croll script

  const getVisibleCards = () => {
    if (!scrollContainerRef.current) return 1;
    const containerWidth = scrollContainerRef.current.clientWidth;
    const cardWidth = 195 + 20; // card width + space-x-5
    return Math.floor(containerWidth / cardWidth);
  };

  // Calculate scroll amount based on visible cards
  const getScrollAmount = () => {
    const visibleCards = getVisibleCards();
    const cardWidth = 195 + 20;
    return visibleCards * cardWidth;
  };

  // Check scroll boundaries
  const checkScrollBoundaries = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScroll - 1); // -1 for floating point precision
  };

  // Scroll left (show previous episodes)
  const scrollLeft = () => {
    if (!scrollContainerRef.current || !canScrollLeft) return;

    const scrollAmount = getScrollAmount();
    scrollContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  // Scroll right (show next episodes)
  const scrollRight = () => {
    if (!scrollContainerRef.current || !canScrollRight) return;

    const scrollAmount = getScrollAmount();
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Update button states on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Check initial state
    checkScrollBoundaries();

    // Add scroll event listener
    const handleScroll = () => {
      checkScrollBoundaries();
    };

    container.addEventListener("scroll", handleScroll);

    // Also check on resize
    const handleResize = () => {
      setTimeout(checkScrollBoundaries, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [episodes]);

  // Reset scroll position when season changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedSeason]);

  useEffect(() => {
    async function getReviews() {
      const reviewsRes = await axiosInstance.get(`/tv/${id}/reviews`, {
        params: { page: 1 },
      });
      setReviewData(reviewsRes.data.results);
    }
    getReviews();
  }, []);

  useEffect(() => {
    if (reviewData.length > 0) {
      const sortedReviews = [...reviewData].sort((a, b) => {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
        return sortReview === "newest" ? dateB - dateA : dateA - dateB;
      });
      setReviewData(sortedReviews);
    }
  }, [sortReview]);
  
  // Loading component
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="m-4 md:m-7 flex flex-col gap-y-14">
      {/* hero */}
      <div className="relative flex  flex-col lg:flex-row h-auto lg:h-[611px] w-full  rounded-3xl overflow-hidden  border-neutral-60 border">
        <div className="w-[50%] relative ">
          {data.posterUrl && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${data.posterUrl}`}
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 500px"
              alt="Poster"
            />
          )}
          {/* dots */}
          <div className="absolute -right-1 h-full w-1  flex flex-col space-y-2">
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
            <div className="w-full h-4 bg-neutral-30 rounded-full"></div>
          </div>
        </div>
        <div className="relative w-full p-5 content-center ">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-100 lg:opacity-20 w-full z-0 drop-shadow-2xl"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.backdropUrl})`,
            }}
          ></div>
          <div className="flex flex-col gap-y-7 z-10 relative">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl text-white font-title font-bold">
                {`${data.name} `}
                <span className="text-neutral-10 text-[12px] font-light ml-5">
                  ({data.year})
                </span>
              </h1>
              <p className="">Series . 50Min . TV-MA</p>
            </div>
            <div className="flex max-w-full">
              <div className="flex flex-col flex-1 gap-y-7">
                <div className="flex space-x-4">
                  {data.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="py-1.5 px-2 md:py-2 md:px-4 text-[10px] md:text-sm rounded-lg border border-neutral-80/80 bg-neutral-90 text-white  mr-2"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <p className="text-white max-w-[80%] max-h-[150px]  leading-relaxed text-[16px] font-extralight  overflow-hidden text-sm md:text-[16px]  ">
                  {data.overview}
                </p>
              </div>
              <div className="flex flex-col justify-between items-end">
                <div className="flex flex-nowrap items-center gap-2 font-medium">
                  <span>{data.imdbRating}</span>
                  <img src="/icons/IMDB.png" alt="icon" className="size-7" />
                </div>
                <div className="flex flex-nowrap items-center gap-2 font-medium">
                  <span>88%</span>
                  <img
                    src="/icons/Rotten Tomatoes.png"
                    alt="icon"
                    className="size-7"
                  />
                </div>
                <div className="flex flex-nowrap items-center gap-2 font-medium">
                  <span>70</span>
                  <img
                    src="/icons/Metacritic.png"
                    alt="icon"
                    className="size-7"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-4 ">
              <button className="bg-primary-50 text-black rounded-md py-1 px-1.5 md:py-2 md:px-3 text-sm md:text-[16px] cursor-pointer">
                Play Last Episode
              </button>
              <button className="border-primary-50 border text-primary-50 rounded-md py-1 px-1.5 md:py-2 md:px-3 text-sm md:text-[16px] cursor-pointer">
                watch trailer
              </button>
            </div>
          </div>
        </div>
        {/* corners effect boxes */}
        {/* <div className="absolute size-[50px]  rounded-br-full shadow-[-4px_-4px_1px_white]  bg-neutral-90   ">
          <div
            className="relative w-full h-full 
                    after:content-[''] after:absolute  after:-right-5 after:rounded-tl-lg 
                    after:w-5 after:h-2 after:shadow-[-4px_-4px_0px_#1a1a1a]
                    before:content-[''] before:absolute  before:-bottom-2 before:rounded-tl-lg 
                    before:w-2 before:h-2 before:shadow-[-4px_-4px_0px_#1a1a1a]"
          ></div>
        </div> */}
      </div>

      {/* navigation menu of  page sections */}
      <div className="flex sticky top-0 space-x-7 text-neutral-50 font-medium px-2 border-b border-neutral-50  bg-neutral-90 z-30 text-sm md:text-[16px]">
        <a
          href="#informations"
          className={`relative transition-all duration-500 py-3 after:transition-all after:duration-300  ${
            menu === "informations"
              ? "text-primary-50 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:rounded-t-lg after:h-1 after:bg-primary-50"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
          onClick={() => setMenu("informations")}
        >
          Informations
        </a>
        <a
          href="#episodes"
          className={`relative transition-all duration-500 py-3 after:transition-all after:duration-300  ${
            menu === "episodes"
              ? "text-primary-50 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:rounded-t-lg after:h-1 after:bg-primary-50"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
          onClick={() => setMenu("episodes")}
        >
          Episodes
        </a>
        <a
          href="#more"
          className={`relative transition-all duration-500 py-3 after:transition-all after:duration-300  ${
            menu === "more"
              ? "text-primary-50 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:rounded-t-lg after:h-1 after:bg-primary-50"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
          onClick={() => setMenu("more")}
        >
          More Like this
        </a>
        <a
          href="#reviews"
          className={`relative transition-all duration-500 py-3 after:transition-all after:duration-300  ${
            menu === "reviews"
              ? "text-primary-50 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:rounded-t-lg after:h-1 after:bg-primary-50"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
          onClick={() => setMenu("reviews")}
        >
          Reviews
        </a>
      </div>

      {/* informations section */}
      <div id="informations" className="flex flex-col space-y-7 scroll-mt-20">
        <h1 className="font-title text-xl font-bold">Informations</h1>
        <div className="flex flex-col md:flex-row  justify-between md:gap-7 w-full px-3">
          <div className="flex flex-col  border-t border-neutral-60   w-full mx-2">
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Flag size={18} className="text-primary-50" />
                <span>Country</span>
              </div>
              <p className="text-neutral-20">{data.country}</p>
            </div>
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <CalendarDays size={18} className="text-primary-50" />
                <span>Release Date</span>
              </div>
              <p className="text-neutral-20">{data.releaseDate}</p>
            </div>
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Languages size={18} className="text-primary-50" />
                <span>Language</span>
              </div>
              <p className="text-neutral-20">{data.language}</p>
            </div>
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Server size={18} className="text-primary-50" />
                <span>Network</span>
              </div>
              <p className="text-neutral-20">{data.network}</p>
            </div>
          </div>
          {/* second col */}
          <div className="flex flex-col space-y-4 md:border-t border-neutral-60  w-full mx-2">
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Clapperboard size={18} className="text-primary-50" />
                <span>Director</span>
              </div>
              <p className="text-neutral-20">{data.director}</p>
            </div>
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Clock size={18} className="text-primary-50" />
                <span>Runtime</span>
              </div>
              <p className="text-neutral-20">{data.runtime}</p>
            </div>
          </div>
        </div>
        {/* stars */}
        <div className="flex flex-col gap-y-4 px-4">
          <h1 className="flex flex-nowrap items-center gap-1 ">
            <Users size={18} className="text-primary-50" /> Stars
          </h1>
          <div
            className="flex space-x-7 overflow-x-scroll "
            style={{ scrollbarWidth: "none" }}
          >
            {/* set stars */}
            {stars.map((star) => {
              return (
                <a
                  href="#"
                  key={star.id}
                  className="flex flex-col gap-1 items-center "
                >
                  <div className="size-72 md:size-96 rounded-full overflow-hidden border border-primary-50 p-1">
                    <div
                      className="size-full bg-cover bg-center rounded-full "
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w92${star.profile_path})`,
                      }}
                    ></div>
                  </div>
                  <h3 className="text-neutral-10 font-light text-sm ">
                    {star.name}
                  </h3>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* episodes section */}
      <div id="episodes" className="flex flex-col scroll-mt-20">
        {/* Season Selector */}
        <div className="flex w-full justify-between items-center">
          <h1 className="font-title text-xl font-bold text-white">Episodes</h1>
          <div
            className={`hidden  space-x-3 text-white md:${
              numberOfSeasons <=6 ? "flex" : "hidden"
            } `}
          >
            {Array.from({ length: numberOfSeasons }, (_, index) => {
              const seasonNumber = index + 1;
              return (
                <button
                  key={seasonNumber}
                  onClick={() => setSelectedSeason(seasonNumber)}
                  className={`relative py-2 px-3 rounded-t-lg transition-all duration-500 after:content-[''] after:absolute after:left-0 after:-bottom-3 after:w-full after:h-3 ${
                    selectedSeason === seasonNumber
                      ? "bg-neutral-80 text-white after:bg-neutral-80"
                      : ""
                  }`}
                >
                  Season {seasonNumber}
                </button>
              );
            })}
          </div>
          <select
            onChange={(e) => setSelectedSeason(e.target.value)}
            className={`block ${
              numberOfSeasons>6? "md:block" : "md:hidden"
            }   py-2 px-3 rounded-t-lg bg-neutral-80`}
          >
            {Array.from({ length: numberOfSeasons }, (_, index) => {
              const seasonNumber = index + 1;
              return (
                <option key={seasonNumber} value={seasonNumber}>
                  Season {seasonNumber}
                </option>
              );
            })}
          </select>
        </div>

        {/* Episodes Content */}
        <div className="flex flex-col items-start space-y-7 p-5 bg-gradient-to-b from-neutral-80 via-transparent rounded-tr-none md:rounded-tr-lg rounded-lg">
          {/* Episode Count */}
          <div className="px-3 py-2 rounded-md bg-neutral-700 font-medium text-white">
            {episodes.length} Episodes
          </div>

          {/* Episodes Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center space-x-5 w-full overflow-x-scroll md:py-3 md:pl-2 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {episodes.map((episode) => (
              <EpisodeCrad
                key={episode.id}
                title={episode.name}
                poster={episode.still_path}
                rating={episode.vote_average}
              />
            ))}
          </div>

          {/* Scroll Buttons */}
          <div className="w-full md:flex justify-center items-center space-x-4 hidden ">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`p-2 rounded-md transition-all duration-200 ${
                canScrollLeft
                  ? "bg-primary-50  cursor-pointer"
                  : "bg-neutral-60 text-neutral-40 cursor-not-allowed opacity-50"
              }`}
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>

            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`p-2 rounded-md transition-all duration-200 ${
                canScrollRight
                  ? "bg-primary-50  cursor-pointer"
                  : "bg-neutral-60 text-neutral-40 cursor-not-allowed opacity-50"
              }`}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* More Like This section */}
      <div id="more" className="flex flex-col space-y-5 scroll-mt-20">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-title text-xl font-bold">More Like This</h1>
          <a href="#" className="text-white flex items-center gap-1">
            View All <span className="text-primary-50 font-bold "> →</span>
          </a>
        </div>
        <div
          className="flex items-center space-x-5 overflow-x-scroll md:py-3 md:pl-2"
          style={{ scrollbarWidth: "none" }}
        >
          {moreData.map((item, index) => {
            return (
              <SuggestionCard
                key={item.id}
                id={item.id}
                title={item.name}
                poster={item.poster_path}
                genres={item.genre_ids}
                rating={item.vote_average}
                type="tv"
              />
            );
          })}
        </div>
      </div>

      {/* Reviews section */}
      <div
        id="reviews"
        className="flex flex-col space-y-5 border border-neutral-50 px-3 py-2 md:px-5 md:py-3 scroll-mt-20"
      >
        <h1 className="font-title text-xl font-bold text-white">Review</h1>

        <div className="border border-neutral-50 px-1 py-1 md:px-4 md:py-2 flex justify-between items-center font-medium rounded-xl text-sm md:text-[16px]">
          <div className="flex justify-center space-x-1 md:space-x-5">
            <div className="flex flex-nowrap  gap-x-1 items-center">
              <ListFilter size={18} className="text-white" />
              <span className="text-neutral-50 text-nowrap ">sort by :</span>
            </div>
            <button onClick={() => setSortReview("newest")} className={`p-1 md:p-2 rounded-lg ${sortReview === "newest" ? "text-black bg-primary-50" : "text-neutral-50"}`}>
              Newest
            </button>
            <button onClick={() => setSortReview("oldest")} className={`p-1 md:p-2 rounded-lg ${sortReview === "oldest" ? "text-black bg-primary-50" : "text-neutral-50"}`}>Oldest</button>
          </div>
          <div className="text-neutral-50 font-normal">
            ({reviewData.length})
          </div>
        </div>

        {reviewData.map((review) => {
          return (
            <div
              key={review.id}
              className="border border-neutral-50 px-4 py-2  rounded-xl text-neutral-20 "
            >
              <div className="flex flex-col md:flex-row justify-between md:space-x-11 ">
                <div className="flexflex-col justify-between space-y-5">
                  <div className="flex items-center space-x-2">
                    <div className="size-11 rounded-full p-1 border border-primary-50">
                      <img
                        src={`https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`}
                        alt="Profile"
                        className="size-full rounded-full"
                      />
                    </div>
                    <span>{review.author}</span>
                  </div>
                  <p className="font-normal text-[12px] ">{review.content}</p>
                  <div className="flex items-center space-x-2 text-[12px] text-neutral-40">
                    <div className="flex items-center space-x-0.5  hover:text-primary-50 cursor-pointer">
                      <ThumbsUp size={16} />
                      <span>0</span>
                    </div>
                    <div className="flex items-center space-x-0.5 hover:text-primary-50 cursor-pointer">
                      <ThumbsUp size={16} className="rotate-180" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col justify-between text-neutral-30 text-[12px] text-nowrap items-end">
                  <div className="">{review.updated_at.slice(0, 10)}</div>
                  <div className="text-primary-50 px-2 py-1 rounded-full border border-primary-50">
                    score: {review.author_details.rating || 0}/10
                  </div>
                  <div className="">report</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
