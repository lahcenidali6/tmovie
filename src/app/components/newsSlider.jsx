import { useState, useEffect } from "react";
import NewsCard from "./newsCard";

const NewsSlider = ({ newsItems }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  function handleNextNews() {
    setCurrentCardIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % newsItems.length;
      return nextIndex;
    });
  }

  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="text-white text-center text-lg">
        there no News to display{" "}
      </div>
    );
  }

  const currentNews = newsItems[currentCardIndex];

  return (
    <div
      className="relative flex flex-col gap-y-2 items-center justify-center"
      onClick={handleNextNews}
    >
      <div
        key={currentNews.id}
        className={`transition-opacity duration-500 ease-in-out`}
      >
        <NewsCard
          news={currentNews}
          index={currentCardIndex}
          totalItems={newsItems.length}
        />
      </div>
    </div>
  );
};

export default NewsSlider;
