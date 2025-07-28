"use client";
import { useRef } from "react";
import Image from "next/image";
import { movieGenres, tvGenres } from "@/app/utils/genres";
import { FiSearch, FiStar } from "react-icons/fi";
import { FaTimes, FaStar } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { ChevronRight } from "lucide-react";
import {
  UserRoundPen,
  ShoppingCart,
  TvMinimalPlay,
  MessagesSquare,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { axiosInstance } from "@/lib/axios.js";
import axios from "axios";

export default function Navbar() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenSearchFilter, setIsOpenSearchFilter] = useState(false);
  const [isOpenGenres, setIsOpenGenres] = useState(false);
  const [isOpenUsercard, setIsOpenUserCard] = useState(false);
  const [searchResultsData, setSearchResultsData] = useState([]);
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const abortControllerRef = useRef(null);
  
  // Get current route info
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mediaType = searchParams.get("type");

  // Helper function to determine active state
  const getActiveClass = (linkType) => {
    if (pathname === "/" && linkType === "all") {
      return "text-primary-50 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-primary-40";
    }
    if (pathname === "/browse" && mediaType === "movie" && linkType === "movie") {
      return "text-primary-50 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-primary-40";
    }
    if (pathname === "/browse" && mediaType === "tv" && linkType === "tv") {
      return "text-primary-50 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-primary-40";
    }
    return "text-white hover:text-primary-50 transition duration-500";
  };

  function handleSearchInput() {
    setIsOpenSearch((prev) => !prev);
  }
  function handleSearchFilter() {
    setIsOpenSearchFilter((prev) => !prev);
  }
  function handleGenres() {
    setIsOpenGenres((prev) => !prev);
  }
  function handleUserCard() {
    setIsOpenUserCard((prev) => !prev);
  }
  // set no scroll when search input are displayed
  useEffect(() => {
    if (isOpenSearch || isOpenSearchFilter) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpenSearch, isOpenSearchFilter]);

  const handleSearch = (e) => {
    const value = e.target.value.trim();
    setQuery(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSearchResultsData([]);
      if (value.length > 0) {
        getSearchResults(value);
      }
    }, 500);
  };
  async function getSearchResults(query) {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      const res = await axiosInstance.get("/search/multi", {
        params: {
          query: query,
          language: "en-US",
          page: 1,
          include_adult: false,
          sort_by: "popularity.desc",
        },
        signal: abortControllerRef.current.signal,
      });

      const formattedSearchResults = res.data.results
        .filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        )
        .map((item) => ({
          id: item.id,
          type: item.media_type,
          title: item.title || item.name || "No title",
          rating: item.vote_average || 0,
          genres: item.genre_ids,
          releaseDate: item.first_air_date || item.release_date || "",
          image: `https://image.tmdb.org/t/p/w92${item.poster_path}`,
        }));

      setSearchResultsData(formattedSearchResults);
      abortControllerRef.current = null;
    } catch (err) {
      if (err.name !== "AbortError" && !axios.isCancel(err)) {
        console.log(err);
      }
      abortControllerRef.current = null;
    }
  }
  return (
    <>
      <div className="flex raltive  items-center justify-between  bg-neutral-90  text-white">
        {/* Left menu */}

        <div className="flex items-center text-sm font-medium transition">
          <div className={`cursor-pointer px-1 md:px-2 relative ${getActiveClass("all")}`}>
            <a href="/">All</a>
          </div>

          <div className={`cursor-pointer px-1 md:px-2 relative ${getActiveClass("movie")}`}>
            <a href="/browse?type=movie">Movies</a>
          </div>

          <div className={`cursor-pointer px-1 md:px-2 relative ${getActiveClass("tv")}`}>
            <a href="/browse?type=tv">Series</a>
          </div>

          <div
            onClick={handleGenres}
            className="cursor-pointer px-1 md:px-2 text-white hover:text-primary-50 transition duration-500"
          >
            Genres <span className="ml-1">▾</span>
            <GenresModale isOpen={isOpenGenres} />
          </div>
        </div>

        {/* Search box & Notifications & Avatar */}
        <div className="flex items-center gap-4">
          {/* icons showing when hidden search input */}
          <FiSearch
            className="text-white text-lg mr-2 block lg:hidden cursor-pointer"
            onClick={handleSearchInput}
          />

          <div
            className={`absolute ${
              isOpenSearch ? "opacity-100 visible" : "opacity-0 invisible"
            }  left-[50%] translate-x-[-50%]   lg:opacity-100 lg:visible z-30 lg:z-30 lg:static lg:translate-x-0 transition duration-300 `}
          >
            {/* search */}

            <div className="flex relative items-center bg-black rounded-2xl px-4 py-2 w-[350px]   ">
              <FiSearch className="text-white text-lg mr-2 " />
              <input
                type="text"
                placeholder="Search the series, movies ..."
                className="block bg-transparent outline-none text-sm placeholder:text-neutral-60 flex-grow"
                onChange={(e) => handleSearch(e)}
              />
              <BiSolidCategory
                className="text-white text-lg ml-2 "
                onClick={handleSearchFilter}
              />
              <FaTimes
                className="text-error text-lg ml-2 lg:hidden cursor-pointer "
                onClick={handleSearchInput}
              />
            </div>
            {/* search resault */}
            <div
              className={`${
                searchResultsData.length > 0
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              } absolute  mt-2 bg-black/85 backdrop-blur-[2px] w-[350px] rounded-2xl p-4 z-30 transition duration-500`}
            >
              <div className="flex justify-between text-[12px] text-neutral-20 border-b border-neutral-60 pb-2">
                <div>Your search result</div>
                <div className="flex gap-1 flex-nowrap items-center cursor-pointer">
                  Show more
                  <ChevronRight size={14} />
                </div>
              </div>
              <div
                className=" flex flex-col max-h-[460px] mt-2 overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {searchResultsData.map((item) => {
                  return (
                    <SearchCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      type={item.type}
                      rating={item.rating}
                      releaseDate={item.releaseDate}
                      genres={item.genres}
                      image={item.image}
                    />
                  );
                })}
              </div>
            </div>
            {/* no results message */}
            <div
              className={`${
                query.trim() !== "" && searchResultsData.length == 0
                  ? "visib"
                  : "invisible"
              } absolute w-full bg-black/85 backdrop-blur-[2px] p-3 rounded-xl text-center text-sm mt-2 before:content-[''] before:absolute before:top-[-12px] before:left-[30px]  before:-translate-x-1/2 before:rotate-180 before:border-8 before:border-transparent before:border-t-black before:rounded-sm`}
            >
              "No results found."
            </div>
          </div>

          <div className="relative">
            <IoMdNotificationsOutline className="text-2xl" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-error rounded-full" />
          </div>
          <div className="relative">
            <div
              className=" h-9 w-9 rounded-full border-2 border-primary-50 overflow-hidden cursor-pointer"
              onClick={handleUserCard}
            >
              <img
                src="https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg"
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>
            <UserCard isOpen={isOpenUsercard} />
          </div>
        </div>
      </div>
      {/* search filter box */}
      <div
        className={`${
          isOpenSearchFilter ? "opcity-100 visible" : "opacity-0 invisible"
        } w-full fixed z-30 h-screen text-white  top-0  left-0 bg-black/70 transition duration-500 `}
      >
        <div className="w-[90%] md:w-[70%] lg:w-[40%] absolute top-[40%]  left-[50%]  translate-[-50%]">
          <div className="w-full flex justify-center">
            <div className="bg-neutral-90 py-2 px-6  rounded-t-2xl">
              Search FIlters
            </div>
          </div>
          {/* search bar */}
          <div className="p-7 rounded-[50px] flex-col-1 bg-neutral-90">
            {/* input */}
            <div className="flex justify-center mb-4 ">
              <div className="flex relative items-center bg-neutral-80 w-full rounded-md px-4 py-2 ">
                <FiSearch className="text-neutral-60 text-lg mr-2 " />
                <input
                  type="text"
                  placeholder="Search the series, movies ..."
                  className="block bg-transparent outline-none text-sm placeholder:text-neutral-60 flex-grow"
                />
              </div>
            </div>

            <div className="flex justify-between gap-x-5 mb-4">
              <Select>
                <SelectTrigger className="w-full border-0  bg-neutral-80">
                  <SelectValue placeholder="Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Action</SelectItem>
                  <SelectItem value="dark">Fantasy</SelectItem>
                  <SelectItem value="system">Drama</SelectItem>
                </SelectContent>
              </Select>
              <ToggleGroup type="single" className="w-full bg-neutral-80">
                <ToggleGroupItem
                  value="a"
                  className="hover:bg-primary-50 hover:text-black rounded-md "
                >
                  ALL
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="b"
                  className="hover:bg-primary-50 hover:text-black rounded-md"
                >
                  Movies
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="c"
                  className="hover:bg-primary-50 hover:text-black rounded-md"
                >
                  Series
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="flex justify-between gap-x-5 mb-4">
              <Select>
                <SelectTrigger className="w-full border-0 bg-neutral-80">
                  <SelectValue placeholder="Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Action</SelectItem>
                  <SelectItem value="dark">Fantasy</SelectItem>
                  <SelectItem value="system">Drama</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full border-0 bg-neutral-80">
                  <SelectValue placeholder="ALL" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">ALL</SelectItem>
                  <SelectItem value="dark">Movie</SelectItem>
                  <SelectItem value="system">Series</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between gap-x-5 mb-4">
              <Select>
                <SelectTrigger className="w-full border-0 bg-neutral-80">
                  <SelectValue placeholder="Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Action</SelectItem>
                  <SelectItem value="dark">Fantasy</SelectItem>
                  <SelectItem value="system">Drama</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full border-0 bg-neutral-80">
                  <SelectValue placeholder="ALL" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">ALL</SelectItem>
                  <SelectItem value="dark">Movie</SelectItem>
                  <SelectItem value="system">Series</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between gap-x-5 mb-4">
              <Input
                className="bg-neutral-80 border-0"
                placeholder="From Year"
              ></Input>
              <Input
                className="bg-neutral-80 border-0"
                placeholder="To Year"
              ></Input>
            </div>
            <div className="flex justify-between gap-x-5 mb-4">
              <Select>
                <SelectTrigger className="w-full border-0 bg-neutral-80">
                  <SelectValue placeholder="Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Action</SelectItem>
                  <SelectItem value="dark">Fantasy</SelectItem>
                  <SelectItem value="system">Drama</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full border-0 bg-neutral-80">
                  <SelectValue placeholder="ALL" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">ALL</SelectItem>
                  <SelectItem value="dark">Movie</SelectItem>
                  <SelectItem value="system">Series</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div></div>
            <div className="flex w-full justify-center  ">
              <Button
                variant=""
                className="bg-primary-50 border-0 hover:bg-primary-50 cursor-pointer rounded-full text-black w-[120px]"
                onClick={handleSearchFilter}
              >
                Search <FiSearch />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SearchCard({
  id,
  title,
  type,
  rating,
  releaseDate,
  genres,
  image,
}) {
  if (type == "tv") {
    var genreNames = tvGenres
      .filter((genre) => genres.includes(genre.id)) // only keep genres that match
      .map((genre) => genre.name);
  } else if ((type = "movie")) {
    var genreNames = movieGenres
      .filter((genre) => genres.includes(genre.id)) // only keep genres that match
      .map((genre) => genre.name);
  }
  return (
    <a
      href={`${type == "tv" ? `/serie/${id}` : `/movie/${id}`}`}
      className="flex gap-2 items-center cursor-pointer hover:bg-neutral-90 p-2 rounded-xl "
    >
      {/* image  */}
      <div className="relative min-w-[30%] h-[100px] rounded-md overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover  "
        />
      </div>
      <div className="flex flex-col space-y-3 h-[100px]">
        {/* title */}
        <h2 className=" font-extrabold text-sm  font-title">{title}</h2>
        {/* IMDB Rating */}
        <div className="flex items-center text-[12px] text-neutral-10 gap-x-2">
          <FaStar size={16} className=" text-primary-50" />
          <span className="font-bold">
            {rating?.toFixed(1)}
            <span className="text-neutral-30">/10</span>
          </span>
          <span>{releaseDate?.slice(0, 4)}</span>
        </div>
        {/* Genres */}
        <div className="text-neutral-10 text-[12px] fllex flex-col flex-nowrap whitespace-nowrap ">
          {genreNames[0]}
          <span className="text-primary-50"> | </span>
          {genreNames[1]}
          <span className="text-primary-50"> | </span>
          {genreNames[2]}
        </div>
      </div>
    </a>
  );
}

export function GenresModale(isOpen) {
  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 53, name: "Thriller" },
    { id: 10770, name: "TV Movie" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  return (
    <div
      className={`${
        isOpen.isOpen
          ? "opacity-100  visible"
          : "opacity-0 translate-y-[50px] invisible"
      } text-white  w-[90%] left-[50%] translate-x-[-50%] md:translate-0 text-md md:w-[500px] lg:w-[700px] md:left-[220px] top-[55px] rounded-[50px] absolute bg-black/85 backdrop-blur-[2px] z-50 p-5  before:content-[''] before:absolute before:top-[-14px] before:left-[190px] md:before:left-[215px]  before:-translate-x-1/2 before:rotate-180 before:border-8 before:border-transparent before:border-t-black before:rounded-sm transition duration-500`}
    >
      <div className="grid  grid-cols-3 lg:grid-cols-5  text-center gap-5  border-neutral-20 border-[1.5px] border-dashed  rounded-[32px] p-6">
        {genres.map((genre, index) => {
          return (
            <a
              key={index}
              href={`/browse?type=movie&genre=${genre.id}`}
              className="font-title font-bold flex text-[12px] md:text-md gap-2 flex-nowrap text-nowrap"
            >
              <div className="w-[9px] h-[9px]  md:w-[12px] md:h-[12px] rounded-full bg-primary-50"></div>
              {genre.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
export function UserCard(isOpen) {
  return (
    <div
      className={`${
        isOpen.isOpen
          ? "opacity-100  visible"
          : "opacity-0 translate-y-[20px] invisible"
      } absolute  p-5 bg-black/85 backdrop-blur-[2px] rounded-xl  z-30 right-0 top-[45px] flex flex-col gap-y-4 before:content-[''] before:absolute before:top-[-12px] before:right-[0px]  before:-translate-x-1/2 before:rotate-180 before:border-8 before:border-transparent before:border-t-black before:rounded-sm transition duration-500`}
    >
      <div className="flex items-center gap-2  relative after:block after:h-[1px] after:w-full after:bg-neutral-70 after:absolute after:left-0 after:bottom-0 pb-5 cursor-pointer">
        <div className="h-9 w-9 rounded-full border-2 border-primary-50 overflow-hidden cursor-pointer">
          <img
            src="https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg"
            alt="User"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-sm font-bold">Sebastian_W</div>
      </div>
      <div className="flex gap-2 items-center text-sm text-neutral-20 hover:text-primary-50 cursor-pointer">
        <UserRoundPen size={18} />
        <div>Edit Profile</div>
      </div>
      <div className="flex gap-2 items-center text-sm text-neutral-20 hover:text-primary-50 cursor-pointer">
        <ShoppingCart size={18} />
        <div>My Purchases</div>
      </div>
      <div className="flex gap-2 items-center text-sm text-neutral-20 hover:text-primary-50 cursor-pointer">
        <TvMinimalPlay size={18} />
        <div>Request Titles</div>
      </div>
      <div className="flex gap-2 items-center text-sm text-neutral-20 hover:text-primary-50 cursor-pointer">
        <MessagesSquare size={18} />
        <div>Comments</div>
      </div>
    </div>
  );
}