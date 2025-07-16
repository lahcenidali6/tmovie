'use client';
import ItemCard from './ItemCard';




export default function CardsSlider({title,data}) {
  return (
    <section className=" w-full">
      <div className="flex justify-between items-center ">
        <h2 className="text-white text-2xl font-bold font-title">{title}</h2>
        <a href="#" className="text-white flex items-center gap-1">
          View All <span className='text-primary-50 font-bold '> →</span>
        </a>
      </div>
      <div className="flex overflow-x-auto space-x-4 md:py-5 md:pl-3" style={{ scrollbarWidth: 'none' }}>
        {data?.map((item, index) => (
          <ItemCard

            key={index}
            title={item.title}
            year={item.year}
            description={item.description}
            genres={item.genres}
            rating={item.rating}
            type={item.type}
            image={item.image}
          />
        ))}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
        div {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
