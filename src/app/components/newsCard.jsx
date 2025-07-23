// components/NewsCard.js
import Image from "next/image";
import { BsCheckCircleFill } from "react-icons/bs"; // You'll need to install react-icons



const NewsCard = ({ news , index , totalItems }) => {
  return (
    <div className="cursor-pointer">
      <div className=" xl:w-[320px] xl:h-screen flex-shrink-0  rounded-3xl   rotate-[-1.02deg] bg-primary-50  ">
        {/* Yellow Border - adjusted to only be left/right/top visible on scroll */}
        <div className="block md:flex xl:h-screen items-center gap-4 xl:block z-10 p-4  bg-black rotate-[1.02deg] rounded-3xl  justify-center">
          {/* Image Container */}
          <div className="relative md:w-[30%]  xl:w-full xl:h-[170px] overflow-auto rounded-2xl mb-3 min-h-[200px]">
            <Image
              src={news.image}
              alt={news.title}
              fill
              sizes={"100%"}
              className="object-cover object-center"
            />
          </div>

          {/* Content Area */}
          <div className=" flex flex-1 flex-col justify-between h-[calc(100%-200px)] relative z-10 ">
            <div className="h-full">
              {/* Category/Hot News Label */}
              <div className="flex items-center text-primary-50 text-sm font-semibold mb-3 ">
                <BsCheckCircleFill className="mr-2 text-lg" />
                {news.title}{" "}
                {/* Using news.title for "Hot News" as in your image */}
              </div>

              {/* Description */}
              <p
                className="text-white text-sm font-light leading-relaxed overflow-hidden"
                style={{ maxHeight: "calc(100% - 100px)" }}
              >
                {news.description}
              </p>
            </div>

            {/* Footer with Date and Page Indicator */}
            <div className="flex justify-between  items-center text-neutral-30 text-sm mt-4">
              <span>{news.date}</span>
              <span>
                {index + 1}/{totalItems}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
