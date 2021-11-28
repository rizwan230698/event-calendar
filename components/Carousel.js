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
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        slidesPerGroup: 1,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 40,
        slidesPerGroup: 1,
        centeredSlides: true,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
        slidesPerGroup: 1,
        centeredSlides: true,
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
          <div className="absolute top-1/2 z-10">
            <NextPrevButton onButtonClick={goPrev} direction="left" />
          </div>
          <div className="absolute top-1/2 right-0 z-10">
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
