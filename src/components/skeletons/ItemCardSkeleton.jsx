export default function ItemCardSkeleton() {
  return (
    <div className="relative cursor-pointer bg-neutral-80 rounded-lg overflow-hidden p-2 min-w-[169px] min-h-[229px] md:min-w-[193px] md:min-h-[262px] animate-pulse">
      <div className="relative rounded-lg overflow-hidden w-full h-full">
        <div className="relative w-full h-full">

          <div className="w-full h-full bg-neutral-70 rounded-t-lg" />


          <div className="absolute top-2 left-2 bg-neutral-70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <div className="w-3 h-3 bg-neutral-60 rounded-full" />
            <div className="w-6 h-2 bg-neutral-60 rounded" />
          </div>


          <div className="absolute top-0 right-0 text-white p-2 rounded-md bg-neutral-70">
            <div className="w-4 h-4 bg-neutral-60 rounded-full" />
          </div>


          <div className="absolute p-3 text-white bottom-0 text-center w-full bg-neutral-90/50 backdrop-blur-[2px] rounded-b-md">
            <div className="w-3/4 h-4 bg-neutral-60 mx-auto rounded mb-1" />
            <div className="w-1/2 h-3 bg-neutral-60 mx-auto rounded" />
          </div>


          <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 flex flex-col bg-black/80 items-center justify-center text-[12px] text-white w-full h-full z-10 px-2 transition duration-400">
            <div className="w-full h-20 bg-neutral-70 rounded mb-4" />
            <div className="absolute bottom-2 w-1/2 h-4 bg-neutral-60 mx-auto rounded mb-1" />
            <div className="w-1/4 h-3 bg-neutral-60 mx-auto rounded" />
          </div>


          <div className="absolute w-[37px] h-[37px] bg-neutral-80 right-0 top-0 rounded-bl-md z-10" />
          <div className="absolute w-[40px] h-[20px] bg-transparent right-[37px] top-0 rounded-tr-md z-10 shadow-[4px_-4px_1px_#333333]" />
          <div className="absolute w-[20px] h-[40px] bg-transparent right-0 top-[37px] rounded-tr-md z-10 shadow-[4px_-4px_1px_#333333]" />
        </div>
      </div>
    </div>
  );
}
