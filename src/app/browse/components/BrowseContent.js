"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import ItemCard from "@/app/components/ItemCard";
import ItemCardSkeleton from "@/app/components/skeletons/ItemCardSkeleton";


export default function BrowseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mediaType = searchParams.get("type") || "movie";
  const filter = searchParams.get("filter") || "popular";
  const page = parseInt(searchParams.get("page")) || 1;
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        let url;
        let params = { page: page };

        if (filter === "trending") {
          url = `/trending/${mediaType}/week`;
        } else {
          url = `/${mediaType}/${filter}`;
        }

        const res = await axiosInstance.get(url, { params });
        
        setTotalPages(res.data.total_pages);
        const formattedData = res.data.results.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          year:
            item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4),
          description: item.overview,
          genres: item.genre_ids || [],
          rating: item.vote_average || 0,
          type: mediaType,
          image: item.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : '/placeholder-image.jpg',
        }));
        setData(formattedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  // Reset to first page when type or filter changes
  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page")) || 1;
    if (currentPage !== 1) {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      router.replace(`?${params.toString()}`);
    }
  }, [mediaType, filter]); 

  // Dynamic pagination logic
  const generatePaginationNumbers = () => {
    const maxVisiblePages = 7; 
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    let startPage, endPage;
    
    if (page <= halfVisible) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (page + halfVisible >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = page - halfVisible;
      endPage = page + halfVisible;
    }
    
    const pages = [];
    
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const paginationNumbers = generatePaginationNumbers();

  // Get filter display name
  const getFilterDisplayName = () => {
    switch (filter) {
      case 'popular': return 'Popular';
      case 'top_rated': return 'Top Rated';
      case 'upcoming': return 'Upcoming';
      case 'now_playing': return 'Now Playing';
      case 'trending': return 'Trending';
      case 'on_the_air': return 'On The Air';
      case 'airing_today': return 'Airing Today';
      default: return filter;
    }
  };

  return (
    <div className="m-4 md:m-7">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-10 mb-2">
          {mediaType === 'movie' ? 'Movies' : 'TV Series'}
        </h1>

      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-5">
        {isLoading ? (
          Array.from({ length: 20 }, (_, index) => (
            <ItemCardSkeleton key={index} />
          ))
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <ItemCard
              key={item.id ?? index}
              id={item.id}
              title={item.title}
              year={item.year}
              description={item.description}
              genres={item.genres}
              rating={item.rating}
              type={item.type}
              image={item.image}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-neutral-40 text-lg">
              No {mediaType === 'movie' ? 'movies' : 'series'} found for the selected criteria.
            </p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && !isLoading && (
        <div className="flex space-x-2 justify-center items-center mt-6 p-4 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              page === 1 
                ? 'text-neutral-40 bg-neutral-90 cursor-not-allowed' 
                : 'text-neutral-20 bg-neutral-80 hover:bg-neutral-70'
            }`}
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {paginationNumbers.map((pageNum, index) => {
              if (pageNum === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-neutral-40"
                  >
                    ...
                  </span>
                );
              }
              
              return (
                <button
                  key={pageNum}
                  className={`min-w-[40px] h-[40px] rounded-lg text-center cursor-pointer transition-colors ${
                    pageNum === page
                      ? "text-black bg-primary-50 font-semibold"
                      : "text-neutral-20 bg-neutral-80 hover:bg-neutral-70"
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              page === totalPages 
                ? 'text-neutral-40 bg-neutral-90 cursor-not-allowed' 
                : 'text-neutral-20 bg-neutral-80 hover:bg-neutral-70'
            }`}
          >
            Next
          </button>
        </div>
      )}
      
      {totalPages > 1 && !isLoading && (
        <div className="text-center text-neutral-40 text-sm mt-2">
          Page {page} of {totalPages}
        </div>
      )}
    </div>
  );
}