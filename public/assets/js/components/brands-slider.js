import Swiper, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

Swiper.use([Autoplay]);

const brandsSlider = () => {
  var brandsSliderTop = new Swiper(".home-brands__slider.brands-top", {
    slidesPerView: "auto",
    spaceBetween: 32,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    speed: 3000,
    loop: true,
  });
  var brandsSliderBottom = new Swiper(".home-brands__slider.brands-bottom", {
    slidesPerView: "auto",
    spaceBetween: 32,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      reverseDirection: true,
    },
    allowTouchMove: false,
    speed: 5000,
    loop: true,
  });
  return { brandsSliderTop, brandsSliderBottom };
};

export default brandsSlider;
