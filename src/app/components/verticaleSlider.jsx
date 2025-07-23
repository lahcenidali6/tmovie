import { useState } from "react";
import { motion } from "framer-motion";
import VerticalCard from "./verticalCard";






const VerticalSlider = ({ data }) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);

  const nextSlide = () => {
    setPrev(current);
    setCurrent((current + 1) % data.length);
  };

  const prevSlide = () => {
    setPrev(current);
    setCurrent((current - 1 + data.length) % data.length);
  };

  return (
    <div className="relative h-[390px] w-full overflow-hidden">
      {/* Previous card fading out */}
      {prev !== null && prev !== current && (
        <motion.div
          key={`prev-${data[prev]?.id}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full z-10"
          onAnimationComplete={() => setPrev(null)}
        >
          <VerticalCard item={data[prev]} />
        </motion.div>
      )}

      {/* Current card fading in */}
      <motion.div
        key={`current-${data[current]?.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1}}
        className="absolute top-0 left-0 w-full h-full z-20"
      >
        <VerticalCard item={data[current]} />
      </motion.div>

      {/* Navigation buttons */}
      <div className="absolute bottom-3  right-4 flex space-x-4 z-20">
        <button
          onClick={prevSlide}
          className=" bg-primary-50 w-[30px] h-[30px] text-black  rounded-full shadow cursor-pointer transition"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="bg-primary-50 w-[30px] h-[30px] text-black  rounded-full shadow cursor-pointer  transition"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default VerticalSlider;
