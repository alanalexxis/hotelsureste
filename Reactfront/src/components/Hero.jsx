import React, { useState, useEffect } from "react";
import beachVid from "../assets/beachVid.mp4";
import { sliderData } from "../constants/data";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
  };

  return (
    <div className="relative overflow-hidden">
      <video
        className="w-full h-screen object-cover"
        src={beachVid}
        autoPlay
        loop
        muted
      />
      <div className="absolute w-full h-full top-0 left-0  flex items-center justify-center">
        <div className="h-full relative flex flex-col items-center justify-center">
          <div className="z-20 text-white text-center">
            <div className="uppercase font-tertiary tracking-[6px] mb-5">
              Descansa y Disfruta al Máximo
            </div>
            <h1 className="font-primary text-[32px] uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6">
              {sliderData[activeIndex].title}
            </h1>
            <button
              className="btn btn-lg btn-primary mx-auto"
              onClick={handleButtonClick}
            >
              {sliderData[activeIndex].btnNext}
            </button>
          </div>

          <div className="absolute w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
