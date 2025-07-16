// components/NewsCard.js
import Image from 'next/image';
import { BsCheckCircleFill } from 'react-icons/bs'; // You'll need to install react-icons

const HotNewsCard = ({ news, index, totalItems }) => {
  return (
    <div className="relative w-[320px] h-[600px] flex-shrink-0 snap-center rounded-2xl overflow-hidden bg-gray-900 border border-yellow-500/20 shadow-lg">
      {/* Yellow Border - adjusted to only be left/right/top visible on scroll */}
      <div className="absolute inset-0 border-y-0 border-r-0 border-l-[6px] border-yellow-500 rounded-2xl z-0 pointer-events-none"></div>

      {/* Image Container */}
      <div className="relative w-full h-[200px] overflow-hidden">
        <Image
          src={news.image}
          alt={news.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col justify-between h-[calc(100%-200px)] relative z-10">
        <div>
          {/* Category/Hot News Label */}
          <div className="flex items-center text-yellow-500 text-sm font-semibold mb-3">
            <BsCheckCircleFill className="mr-2 text-lg" />
            {news.title} {/* Using news.title for "Hot News" as in your image */}
          </div>

          {/* Description */}
          <p className="text-gray-200 text-base leading-relaxed overflow-hidden" style={{ maxHeight: 'calc(100% - 100px)' }}>
            {news.description}
          </p>
        </div>

        {/* Footer with Date and Page Indicator */}
        <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
          <span>{news.date}</span>
          <span>{index + 1}/{totalItems}</span>
        </div>
      </div>
    </div>
  );
};

export default HotNewsCard;