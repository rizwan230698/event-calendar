import { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import { NextPrevButton } from "./NextPrevButton";

export const Carousel = ({ children, initialActiveIndex = 0 }) => {
  const [swiper, setSwiper] = useState();
  const [, setIsEnd] = useState(swiper ? swiper.isEnd : false);
  const [, setIsBeginning] = useState(swiper ? swiper.isEnd : true);

  const params = {
    navigation: {
      nextEl: ".nextButton",
      prevEl: ".prevButton",
      clickable: true,
    },
    slidesPerView: 3,
    slidesPerGroup: 1,
    allowTouchMove: true, // Setting this to false broke the isEnd and isBeginning of the carousel
    shouldSwiperUpdate: true,
    centeredSlides: true,
    spaceBetween: 0,
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      340: {
        spaceBetween: 20,
        slidesPerView: 1,
      },
    },
  };

  const goNext = () => {
    if (swiper) {
      swiper.slideNext();
      setIsEnd(swiper.isEnd);
      setIsBeginning(swiper.isBeginning);
    }
  };

  const goPrev = () => {
    if (swiper) {
      swiper.slidePrev();
      setIsEnd(swiper.isEnd);
      setIsBeginning(swiper.isBeginning);
    }
  };

  useEffect(() => {
    swiper && swiper.slideTo(initialActiveIndex);
  }, [swiper]);

  return (
    <div className="w-full h-full relative">
      {swiper && swiper.isBeginning && swiper.isEnd ? null : (
        <>
          <div className="absolute top-1/2 -left-8 md:left-0 z-10 transform -translate-y-1/2">
            <NextPrevButton onButtonClick={goPrev} direction="left" />
          </div>
          <div className="absolute top-1/2 -right-8 md:right-0 z-10 -translate-y-1/2">
            <NextPrevButton onButtonClick={goNext} direction="right" />
          </div>
        </>
      )}

      <Swiper getSwiper={setSwiper} {...params}>
        {children.map((child, index) => (
          <div key={index} className="">
            {child}
          </div>
        ))}
      </Swiper>
    </div>
  );
};
