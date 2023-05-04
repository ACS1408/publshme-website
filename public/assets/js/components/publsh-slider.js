import Swiper from "swiper";
import "swiper/css";

const publshSlider = () => {
  var featureSlider = new Swiper(".home-features__slider.slider-desk", {
    slidesPerView: "auto",
    spaceBetween: 40,
    allowTouchMove: true,
  });
  var featureSliderMob = new Swiper(".home-features__slider.slider-mob", {
    slidesPerView: 1.1,
    spaceBetween: 15,
    allowTouchMove: true,
    freeMode: true,
    pagination: {
      el: ".publsh-pagination",
      clickable: true
    },
  });
  return { featureSlider, featureSliderMob };
};

export default publshSlider;
