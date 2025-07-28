import React from "react";
import ItemCardSkeleton from "@/app/components/skeletons/ItemCardSkeleton";

export default function BrowsePageSkeleton() {
  return (
    <div className="m-4 md:m-7">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-8 bg-neutral-80 rounded-lg mb-2 w-48 animate-pulse"></div>
        <div className="h-4 bg-neutral-80 rounded-lg w-32 animate-pulse"></div>
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-5">
        {Array.from({ length: 20 }, (_, index) => (
          <ItemCardSkeleton key={index} />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex space-x-2 justify-center items-center mt-6 p-4">
        <div className="h-10 w-20 bg-neutral-80 rounded-lg animate-pulse"></div>
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="h-10 w-10 bg-neutral-80 rounded-lg animate-pulse"></div>
        ))}
        <div className="h-10 w-16 bg-neutral-80 rounded-lg animate-pulse"></div>
      </div>

      {/* Page info skeleton */}
      <div className="text-center mt-2">
        <div className="h-4 w-24 bg-neutral-80 rounded-lg animate-pulse mx-auto"></div>
      </div>
    </div>
  );
}