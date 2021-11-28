import { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import { NextPrevButton } from "./NextPrevButton";

export const Carousel = ({ children, initialActiveIndex = 0 }) => {
  const [swiper, setSwiper] = useState();

  const params = {
    navigation: {
      nextEl: ".nextButton",
      prevEl: ".prevButton",
      clickable: true,
    },
    slidesPerView: 3,
    slidesPerGroup: 1,
    allowTouchMove: true,
    shouldSwiperUpdate: true,
    centeredSlides: true,
    spaceBetween: 0,
    breakpoints: {
      640: {
        slidesPerView: 3,
      },
      340: {
        spaceBetween: 5,
        slidesPerView: 1,
      },
    },
  };

  const goNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  useEffect(() => {
    swiper && swiper.slideTo(initialActiveIndex);
  }, [swiper]);

  return (
    <div className="w-full h-full relative">
      {/* Navigation buttons */}
      {!swiper ? null : (
        <>
          <div className="absolute top-1/2 -left-8 sm:left-0 z-10 transform -translate-y-1/2">
            <NextPrevButton onButtonClick={goPrev} direction="left" />
          </div>
          <div className="absolute top-1/2 -right-8 sm:right-0 z-10 -translate-y-1/2">
            <NextPrevButton onButtonClick={goNext} direction="right" />
          </div>
        </>
      )}

      {/* Carousel */}
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
