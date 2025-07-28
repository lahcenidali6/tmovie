import React, { Suspense } from "react";
import BrowseContent from "./components/BrowseContent";
import BrowsePageSkeleton from "./components/skeletons/BrowsePageSkeleton";

export default function BrowsePage() {
  return (
    <Suspense fallback={<BrowsePageSkeleton />}>
      <BrowseContent />
    </Suspense>
  );
}