import Image from 'next/image';

export default function Banner({ 
  backgroundImage="https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg", 
  title="Peaky Blinder", 
  description="Peaky Blinders is a British crime drama about the Shelby family in post-World War I Birmingham, as they build their power through criminal activities. Led by the cunning Tommy Shelby, the show mixes intense drama with historical grit.", 
  leftLabel="thomas", 
  rightLabel="chelby", 
  yearLocation="berminghame 1919", 
  trailerText ="watch trailer"
}) {
  return (
    <section className="relative w-full h-[600px] bg-black text-white overflow-hidden font-serif">
      <Image
        src={backgroundImage} // example: '/images/peaky-blinders.jpg'
        alt={title}
        layout="fill"
        objectFit="cover"
        className="opacity-70"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <div className="absolute top-10 left-20 text-xl tracking-widest">{leftLabel}</div>
        <div className="absolute top-10 right-20 text-xl tracking-widest">{rightLabel}</div>

        <div className="max-w-2xl bg-black/60 p-4 border border-gray-400 mb-6">
          <p className="text-sm leading-relaxed">{description}</p>
        </div>

        <div className="text-5xl font-bold uppercase mb-2">{title}</div>
        <div className="text-sm uppercase mb-6">{yearLocation}</div>

        <button className="flex items-center bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition">
          <span className="mr-2">▶</span> {trailerText}
        </button>
      </div>
    </section>
  );
}
