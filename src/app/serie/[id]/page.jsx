"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { tvGenres } from "@/app/utils/genres";
import {
  Flag,
  CalendarDays,
  Languages,
  Server,
  Clapperboard,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";
import EpisodeCrad from "@/components/EpisodeCrad";
import SuggestionCard from "@/components/SuggestionCard";
const key = process.env.NEXT_PUBLIC_API_KEY;

export default function page({ params }) {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&language=en-US`
        ).then((res) => res.json());

        setData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="m-7 flex flex-col gap-y-14">
      {/* hero */}
      <div className="relative flex  flex-col lg:flex-row h-auto lg:h-[611px] w-full  rounded-3xl overflow-hidden border-neutral-20 border-1">
        <div className="w-[45%] relative ">
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            layout="fill"
            objectFit="cover"
            alt="Poster"
          />
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
            className="absolute inset-0 bg-cover bg-center opacity-10 w-full z-0 drop-shadow-2xl"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`,
            }}
          ></div>
          <div className="flex flex-col gap-y-7 z-10 relative">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl text-white font-title font-bold">
                {`${data.name} `}
                <span className="text-neutral-10 text-sm ml-5">
                  ({new Date(data.first_air_date).getFullYear()})
                </span>
              </h1>
              <p className="">Series</p>
            </div>
            <div className="flex max-w-full">
              <div className="flex flex-col flex-1 gap-y-7">
                <div className="flex space-x-4">
                  {data.genres?.map((genre) => (
                    <span
                      key={genre.id} 
                      className="py-2 px-4 rounded-lg border border-neutral-80/80 bg-neutral-90 text-white text-sm mr-2"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <p className="text-white max-w-[80%] max-h-[150px]  leading-relaxed text-[16px] font-extralight  overflow-hidden  ">
                 {data.overview}
                </p>
              </div>
              <div className="flex flex-col justify-between items-end">
                <div className="flex flex-nowrap items-center gap-2 font-medium">
                  <span>8.4</span>{" "}
                  <img src="/icons/IMDB.png" alt="icon" className="size-7" />
                </div>
                <div className="flex flex-nowrap items-center gap-2 font-medium">
                  <span>88%</span>{" "}
                  <img
                    src="/icons/Rotten Tomatoes.png"
                    alt="icon"
                    className="size-7"
                  />
                </div>
                <div className="flex flex-nowrap items-center gap-2 font-medium">
                  <span>70</span>{" "}
                  <img
                    src="/icons/Metacritic.png"
                    alt="icon"
                    className="size-7"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-primary-50 text-black rounded-md py-2 px-3 cursor-pointer">
                Play Last Episode
              </button>
              <button className="border-primary-50 border text-primary-50 rounded-md py-2 px-3 cursor-pointer">
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
      <div className="flex sticky top-0 space-x-7 text-neutral-50 font-medium px-2 border-b border-neutral-50  py-2 bg-neutral-90 z-30">
        <a
          href="#informations"
          className="relative text-primary-50 after:content-[''] after:absolute after:left-0 after:-bottom-2  after:w-full after:rounded-t-lg 
                     after:h-1 after:bg-primary-50"
        >
          Informations
        </a>
        <a href="#episodes">Episodes</a>
        <a href="#more">More Like this</a>
        <a href="#reviews">Reviews</a>
      </div>
      {/* informations section */}
      <div id="informations" className="flex flex-col space-y-7">
        <h1 className="font-title text-xl font-bold">Informations</h1>
        <div className="flex flex-col md:flex-row  justify-between gap-7 w-full px-3">
          <div className="flex flex-col  border-t border-neutral-60   w-full mx-2">
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Flag size={18} className="text-primary-50" />
                <span>Country</span>
              </div>
              <p className="text-neutral-20">United States</p>
            </div>
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <CalendarDays size={18} className="text-primary-50" />
                <span>Release Date</span>
              </div>
              <p className="text-neutral-20">August 21, 2022</p>
            </div>
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Languages size={18} className="text-primary-50" />
                <span>Language</span>
              </div>
              <p className="text-neutral-20">English</p>
            </div>
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Server size={18} className="text-primary-50" />
                <span>Network</span>
              </div>
              <p className="text-neutral-20">HBO</p>
            </div>
          </div>
          {/* second col */}
          <div className="flex flex-col space-y-4 border-t border-neutral-60  w-full mx-2">
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Clapperboard size={18} className="text-primary-50" />
                <span>Director</span>
              </div>
              <p className="text-neutral-20">Ryan Condal</p>
            </div>
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Clock size={18} className="text-primary-50" />
                <span>Runtime</span>
              </div>
              <p className="text-neutral-20">50min</p>
            </div>
          </div>
        </div>
        {/* stars */}
        <div className="flex flex-col gap-y-4 px-4">
          <h1 className="flex flex-nowrap items-center gap-1 ">
            <Users size={18} className="text-primary-50" /> Stars
          </h1>
          <div
            className="flex space-x-7 overflow-x-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex flex-col items-center">
              <Image
                src="/gameoftrhonr.webp"
                width={80}
                height={80}
                alt="Game of Thrones"
                className="rounded-full p-1 border-1 border-primary-50 size-[60px]"
              />
              <h3 className="text-neutral-10 font-light text-sm">
                Olivia Cooke
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/gameoftrhonr.webp"
                width={80}
                height={80}
                alt="Game of Thrones"
                className="rounded-full p-1 border-1 border-primary-50 size-[60px]"
              />
              <h3 className="text-neutral-10">Olivia Cooke</h3>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/gameoftrhonr.webp"
                width={80}
                height={80}
                alt="Game of Thrones"
                className="rounded-full p-1 border-1 border-primary-50 size-[60px]"
              />
              <h3 className="text-neutral-10">Olivia Cooke</h3>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/gameoftrhonr.webp"
                width={80}
                height={80}
                alt="Game of Thrones"
                className="rounded-full p-1 border-1 border-primary-50 size-[60px]"
              />
              <h3 className="text-neutral-10">Olivia Cooke</h3>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/gameoftrhonr.webp"
                width={80}
                height={80}
                alt="Game of Thrones"
                className="rounded-full p-1 border-1 border-primary-50 size-[60px]"
              />
              <h3 className="text-neutral-10">Olivia Cooke</h3>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/gameoftrhonr.webp"
                width={80}
                height={80}
                alt="Game of Thrones"
                className="rounded-full p-1 border-1 border-primary-50 size-[60px]"
              />
              <h3 className="text-neutral-10">Olivia Cooke</h3>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/gameoftrhonr.webp"
                width={80}
                height={80}
                alt="Game of Thrones"
                className="rounded-full p-1 border-1 border-primary-50 size-[60px]"
              />
              <h3 className="text-neutral-10">Olivia Cooke</h3>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/gameoftrhonr.webp"
                width={80}
                height={80}
                alt="Game of Thrones"
                className="rounded-full p-1 border-1 border-primary-50 size-[60px]"
              />
              <h3 className="text-neutral-10">Olivia Cooke</h3>
            </div>
          </div>
        </div>
      </div>
      {/* episodes section */}
      <div id="episodes" className="flex flex-col">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-title text-xl font-bold">Episodes</h1>
          <div className="flex space-x-3 text-white">
            <button className="py-2 px-3 bg-neutral-80/50 rounded-t-lg">
              Season 1
            </button>
            <button className="py-2 px-3  rounded-t-lg">Season 2</button>
            <button className="py-2 px-3  rounded-t-lg">Season 3</button>
          </div>
        </div>
        <div className="flex flex-col items-start space-y-7 p-5 bg-gradient-to-b from-neutral-80/50 via-transparent to-neutral-90  rounded-lg">
          <div className="px-3 py-2 rounded-md bg-neutral-70 font-medium text-white">
            10 Episode
          </div>
          <div className="flex items-center space-x-5  w-full ">
            <EpisodeCrad />
            <EpisodeCrad />
            <EpisodeCrad />
            <EpisodeCrad />
            <EpisodeCrad />
            <EpisodeCrad />
          </div>
          <div className="w-full flex justify-center items-center space-x-4">
            <div className="p-2 bg-neutral-60 rounded-md text-neutral-70">
              <ArrowRight size={20} className="rotate rotate-180" />
            </div>
            <div className="p-2 bg-primary-50 rounded-md text-neutral-70">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </div>
      {/* More Like This section */}
      <div id="more" className="flex flex-col space-y-5">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-title text-xl font-bold">More Like This</h1>
          <a href="#" className="text-white flex items-center gap-1">
            View All <span className="text-primary-50 font-bold "> →</span>
          </a>
        </div>
        <div className="flex items-center space-x-5">
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
        </div>
      </div>
    </div>
  );
}
