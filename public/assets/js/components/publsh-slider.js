import Swiper from "swiper";
import "swiper/css";

const publshSlider = () => {
  var featureSlider = new Swiper(".home-features__slider.slider-desk", {
    slidesPerView: "auto",
    spaceBetween: 40,
    allowTouchMove: true,
  });
  var featureSliderMob = new Swiper(".home-features__slider.slider-mob", {
    slidesPerView: "auto",
    spaceBetween: 40,
    allowTouchMove: true,
    freeMode: true,
    pagination: {
      el: ".publsh-pagination",
    },
  });
  return { featureSlider, featureSliderMob };
};

export default publshSlider;
