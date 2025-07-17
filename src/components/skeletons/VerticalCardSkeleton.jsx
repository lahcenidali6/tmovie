const VerticalCardSkeleton = () => {
  return (
    <div
      className="relative bg-neutral-80 h-[391px] flex-shrink-0 rounded-2xl overflow-hidden p-3 animate-pulse"
    >
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-neutral-70" />

      {/* Overlay */}
      <div className="relative z-10 h-full w-full bg-black/60 md:backdrop-blur-[2px] flex flex-col justify-end p-5 text-white rounded-2xl gap-y-2.5">
        
        {/* Title */}
        <div className="h-6 w-3/4 bg-neutral-60 rounded-md" />

        {/* Rating and genres */}
        <div className="flex gap-2 items-center flex-wrap">
          {/* IMDb badge */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-10 bg-neutral-60 rounded" />
            <div className="h-5 w-8 bg-neutral-60 rounded" />
          </div>
          {/* Genres */}
          <div className="flex gap-1">
            <div className="h-4 w-16 bg-neutral-60 rounded" />
            <div className="h-4 w-1 bg-primary-50 rounded" />
            <div className="h-4 w-16 bg-neutral-60 rounded" />
            <div className="h-4 w-1 bg-primary-50 rounded" />
            <div className="h-4 w-16 bg-neutral-60 rounded" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-neutral-60 rounded" />
          <div className="h-4 w-5/6 bg-neutral-60 rounded" />
          <div className="h-4 w-4/6 bg-neutral-60 rounded" />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-2">
          <div className="h-[30px] md:h-[36px] w-[100px] md:w-[143px] bg-neutral-60 rounded-sm" />
          <div className="h-[30px] md:h-[36px] w-[100px] md:w-[143px] bg-neutral-60 rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default VerticalCardSkeleton;
