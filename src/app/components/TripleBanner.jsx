import Image from "next/image";
export const TripeBanner = () => {
  const images = [
    "https://image.tmdb.org/t/p/original/Ao5pBFuWY32cVuh6iYjEjZMEscN.jpg&quot",
    "https://image.tmdb.org/t/p/original/9faGSFi5jam6pDWGNd0p8JcJgXQ.jpg&quot",
    "https://image.tmdb.org/t/p/original/2GskQMikmz7YrWZJtdeWSG9lmPq.jpg&quot",
  ];
  return (
    <div className="w-full flex text-white h-[95vh] gap-4">
      <div className="min-w-[65%] h-full flex flex-col gap-4 border">
        <div className="relative h-full rounded-tl-xl overflow-hidden border-red-600 border">
          <Image
            src={images[0]}
            alt={"test"}
            fill
            sizes={"100%"}
            priority
            className="rounded-t-lg object-cover  "
          />
          <div className="absolute flex flex-col gap-4 bottom-[50%] translate-y-[50%] left-4 w-[60%] border border-green-700 ">
            <div className="font-semibold text-[22px]">Uncovering Secrets, Shifting Powers</div>
            <div className="text-6xl font-bold text-primary-50">Shogun</div>
            <p className="text-sm font-light leading-6 text-neutral-10">When a mysterious European ship sinks near a nearby fishing village, Lord Yoshi Toranaga uncovers secrets that could tip the balance of power and devastate his enemies. He must act quickly to protect his realm from the looming threat.</p>
          </div>
          <a href="#" className="absolute bottom-4 right-4  bg-primary-50 text-black py-2 px-4 rounded-full text-[12px] font-medium">Watch New</a>
        </div>
        <div className="relative h-full rounded-bl-xl overflow-hidden border">
          {" "}
          <Image
            src={images[1]}
            alt={"test"}
            fill
            sizes={"100%"}
            priority
            className="rounded-t-lg object-cover  "
          />
          <a href="#" className="absolute top-4 left-4  bg-primary-50 text-black py-2 px-4 rounded-full text-[12px] font-medium">Watch New</a>

        </div>
      </div>
      <div className="relative border w-full h-full rounded-r-xl overflow-hidden">
        {" "}
        <Image
          src={images[2]}
          alt={"test"}
          fill
          sizes={"100%"}
          priority
          className="rounded-t-lg object-cover  "
        />
          <a href="#" className="absolute top-4 left-4  bg-primary-50 text-black py-2 px-4 rounded-full text-[12px] font-medium">Watch New</a>
      </div>
    </div>
  );
};
