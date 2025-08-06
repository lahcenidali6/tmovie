"use client";
import { axiosInstance } from "@/lib/axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Flag, User, Users, CalendarDays, Heart } from "lucide-react";
import SuggestionCard from "@/app/components/SuggestionCard";

export default function page() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState("informations");
  const [worksOriginData, setWorksOriginData] = useState([]);
  const [works, setWorks] = useState([]);
  const [numberOfDisplay, setNumberOfDisplay] = useState(10);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function fetchPersonData() {
      try {
        const res = await axiosInstance.get(`/person/${id}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPersonData();
  }, [id]);
  useEffect(() => {
    async function fetchPersonWorks() {
      try {
        const res = await axiosInstance.get(`/person/${id}/combined_credits`);
        setWorksOriginData(res.data.cast);
        setWorks(res.data.cast);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPersonWorks();
  }, [id]);
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to get gender
  const getGender = (genderCode) => {
    switch (genderCode) {
      case 1:
        return "Female";
      case 2:
        return "Male";
      case 3:
        return "Non-binary";
      default:
        return "Unknown";
    }
  };

  // function to get age
  const getAge = (birthday, deathday) => {
    if (!birthday) return "Unknown";
    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date();
    const age = Math.floor(
      (endDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000)
    );
    return deathday ? `${age} (deceased)` : `${age} years old`;
  };

  useEffect(() => {
    let result = [...worksOriginData];

    // Filter by type
    if (filter !== "all") {
      result = result.filter((item) => item.media_type === filter);
    }

    // Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case "date":
        result.sort((a, b) => {
          const dateA = new Date(
            a.release_date || a.first_air_date || "1900-01-01"
          );
          const dateB = new Date(
            b.release_date || b.first_air_date || "1900-01-01"
          );
          return dateB - dateA;
        });
        break;
      case "popularity":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        break;
    }
    setWorks(result);
    setNumberOfDisplay(10)
  }, [filter, sortBy, worksOriginData]);

  const handleShowMore = () => {
    console.log(works.length);
    if (works.length > numberOfDisplay + 10) {
      setNumberOfDisplay((prev) => prev + 10);
    } else {
      setNumberOfDisplay(works.length);
    }
  };
  return (
    <div className="m-4 md:m-14 flex flex-col space-y-14">
      {/* hero */}
      <div className="flex justify-center">
        <div className="flex space-x-5 md:space-x-11 items-center   lg:w-[85%] relative">
          <div
            className="min-w-[8rem] md:min-w-[12rem] h-full rounded-xl p-[1px]"
            style={{
              backgroundImage:
                "linear-gradient(125deg, white 0%, #333333 40%, #333333 75%, white 100%)",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
              alt="profile pic"
              className="w-full h-full object-cover rounded-xl z-10"
            />
          </div>
          <div className="flex flex-col space-y-5 md:space-y-11 ">
            <div>
              <h1 className="text-[28px] md:text-[38px] text-primary-50 font-title font-bold ">
                {data.name}
              </h1>
              <p className="text-[12px] md:text-sm font-medium text-neutral-30">
                {data.known_for_department || "Actor"}
              </p>
            </div>
            <div className="relative max-h-[6rem] overflow-hidden">
              <p className="text-[12px] md:text-[14px] font-medium text-neutral-20 leading-[25px]  line-clamp-4">
                {data.biography || "No biography available."}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-neutral-90 to-transparent pointer-events-none" />
            </div>
          </div>
          <img
            src="/vector.png"
            alt=".."
            className="absolute top-0 right-0 size-[8rem]"
          />
        </div>
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
          href="#gallery"
          className={`relative transition-all duration-500 py-3 after:transition-all after:duration-300  ${
            menu === "gallery"
              ? "text-primary-50 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:rounded-t-lg after:h-1 after:bg-primary-50"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
          onClick={() => setMenu("gallery")}
        >
          Gallery
        </a>
        <a
          href="#works"
          className={`relative transition-all duration-500 py-3 after:transition-all after:duration-300  ${
            menu === "works"
              ? "text-primary-50 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:rounded-t-lg after:h-1 after:bg-primary-50"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
          onClick={() => setMenu("works")}
        >
          Works
        </a>
      </div>
      {/* informations section */}
      <div id="informations" className="flex flex-col space-y-7 scroll-mt-20">
        <h1 className="font-title text-xl font-bold">Informations</h1>
        <div className="flex flex-col md:flex-row  justify-between md:gap-7 w-full px-3">
          <div className="flex flex-col  border-t border-neutral-60   w-full mx-2">
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <User size={18} className="text-primary-50" />
                <span>Full Name</span>
              </div>
              <p className="text-neutral-20">{data.name || "Unknown"}</p>
            </div>
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Flag size={18} className="text-primary-50" />
                <span>Place of Birth</span>
              </div>
              <p className="text-neutral-20">
                {data.place_of_birth || "Unknown"}
              </p>
            </div>
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Users size={18} className="text-primary-50" />
                <span>Gender</span>
              </div>
              <p className="text-neutral-20">{getGender(data.gender)}</p>
            </div>
          </div>
          {/* second col */}
          <div className="flex flex-col space-y-4 md:border-t border-neutral-60  w-full mx-2">
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <CalendarDays size={18} className="text-primary-50" />
                <span>Birthday</span>
              </div>
              <p className="text-neutral-20">{formatDate(data.birthday)}</p>
            </div>
            <div className="flex justify-between border-b border-neutral-60 py-4">
              <div className="flex flex-nowrap gap-x-2 text-white items-center">
                <Heart size={18} className="text-primary-50" />
                <span>Age</span>
              </div>
              <p className="text-neutral-20">
                {getAge(data.birthday, data.deathday)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* WOrks section */}
      <div className="flex flex-col space-y-7 scroll-mt-20" id="works">
        <div className="flex justify-between items-center">
          <h1 className="font-title text-xl font-bold">Works</h1>
          <div className="flex space-x-2 items-center">
            <Select onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="bg-neutral-80 py-1 px-3 rounded-full border-none">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="date">Release date</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
            <ul className="flex space-x-0.5 p-1.5 bg-neutral-80 rounded-full text-[12px] font-semibold transition-all">
              <li
                onClick={() => setFilter("all")}
                className={`px-4 py-1 ${
                  filter === "all"
                    ? "bg-primary-50 text-black "
                    : "text-neutral-10"
                } rounded-full cursor-pointer`}
              >
                All
              </li>
              <li
                onClick={() => setFilter("movie")}
                className={`px-4 py-1 ${
                  filter === "movie"
                    ? "bg-primary-50 text-black "
                    : "text-neutral-10"
                } rounded-full cursor-pointer`}
              >
                Movies
              </li>
              <li
                onClick={() => setFilter("tv")}
                className={`px-4 py-1 ${
                  filter === "tv"
                    ? "bg-primary-50 text-black "
                    : "text-neutral-10"
                } rounded-full cursor-pointer`}
              >
                Series
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-5">
          {works?.slice(0, numberOfDisplay)?.map((item, index) => {
            return (
              <SuggestionCard
                key={index}
                id={item.id}
                title={item.title || item.name}
                poster={item.poster_path}
                genres={item.genre_ids}
                rating={item.vote_average}
                type={item.media_type}
              />
            );
          })}
        </div>
        <div className="w-full  flex justify-center">
          {numberOfDisplay < works.length ? (
            <button
              onClick={handleShowMore}
              className="px-2 py-1 rounded-md border-[1px] border-neutral-60 cursor-pointer"
            >
              Show More{" "}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
