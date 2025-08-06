"use client";
import React, { useEffect, useState, useRef } from "react";
import ArtistCard from "./components/ArtistCard";
import { FiSearch } from "react-icons/fi";
import { axiosInstance } from "@/lib/axios";
import ArtistCardSkeleton from "./components/ArtistCardSkeleton";

export default function page() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(null);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      async function fetchData() {
        setIsLoading(true);
        try {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }

          abortControllerRef.current = new AbortController();
          let url = "/person/popular";
          if (query) url = `/search/person?query=${query}`;
          const res = await axiosInstance.get(url, {
            params: { page: page },
            signal: abortControllerRef.current.signal,
          });
          setTotalPages(res.data.total_pages);
          setData(res.data.results);
          abortControllerRef.current = null;
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [page, query]);

  return (
    <div className="m-4 md:m-7 flex flex-col space-y-7">
      <h1 className=" font-title font-bold text-[22px] w-full text-center text-white">
        List of Artists
      </h1>
      <div className="flex relative items-center bg-neutral-80 w-full md:w-[70%] left-[50%] -translate-x-[50%] rounded-md p-2 ">
        <FiSearch className="text-white text-lg mr-2 " />
        <input
          onChange={(e) => setQuery(e.target.value.trim())}
          type="text"
          placeholder="Search the Actors, Actresses ..."
          className="block bg-transparent outline-none text-sm placeholder:text-neutral-60 flex-grow"
        />
      </div>
      <ul className="flex space-x-4 justify-center font-medium">
        <li className="text-primary-50 text-[16px] cursor-pointer ">All</li>
        <li className="text-neutral-10 text-[16px] cursor-pointer">Actor</li>
        <li className="text-neutral-10 text-[16px] cursor-pointer">Actress</li>
        <li className="text-neutral-10 text-[16px] cursor-pointer">Director</li>
        <li className="text-neutral-10 text-[16px] cursor-pointer">Writer</li>
        <li className="text-neutral-10 text-[16px] cursor-pointer">
          Productor
        </li>
      </ul>
      {data.length === 0 && (
        <div className="text-center text-warning">No results found</div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-5">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <ArtistCardSkeleton key={i} />
            ))
          : data.map((person) => (
              <ArtistCard
                key={person.id}
                id={person.id}
                profile={person.profile_path}
                name={person.name}
              />
            ))}
      </div>
      {/* pagination */}
      {data.length > 0 && (
        <div className="flex space-x-2 justify-center items-center mt-6 p-4 flex-wrap">
          {Array.from({ length: 10 }, (_, index) => index + 1).map(
            (pageNum) => {
              return (
                <button
                  key={pageNum}
                  className={`min-w-[40px] h-[40px] rounded-lg text-center cursor-pointer transition-colors ${
                    pageNum === page
                      ? "text-black bg-primary-50 font-semibold"
                      : "text-neutral-20 bg-neutral-80 hover:bg-neutral-70"
                  }`}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            }
          )}
        </div>
      )}

      <div className="text-center text-neutral-40 text-sm mt-2">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}
