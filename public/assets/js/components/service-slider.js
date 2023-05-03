import Swiper, {
  EffectFade,
  Controller,
  Pagination,
  FreeMode,
  Thumbs,
} from "swiper";
import "swiper/css/bundle";

Swiper.use([EffectFade, Controller, Pagination, FreeMode, Thumbs]);

const serviceSlider = () => {
  var workSlider = new Swiper(".service-slider", {
    slidesPerView: 1.8,
    speed: 1000,
    breakpoints: {
      1420: {
        slidesPerView: 1.2
      }
    }
  });
  var workTitleSlider = new Swiper(".service-title-slider", {
    slidesPerView: 1,
    speed: 1000,
    effect: "fade",
    pagination: {
      el: ".service-pagination",
      clickable: true,
      // dynamicBullets: true,
    },
  });

  var thumbSlider = new Swiper(".service-thumb-slider-mob", {
    spaceBetween: 22,
    slidesPerView: 3.5,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var previewSlider = new Swiper(".service-preview-slider-mob", {
    spaceBetween: 22,
    effect: "fade",
    thumbs: {
      swiper: thumbSlider,
    },
  });

  workSlider.controller.control = workTitleSlider;
  workTitleSlider.controller.control = workSlider;
  return { workSlider, workTitleSlider, previewSlider, thumbSlider };
};

export default serviceSlider;
