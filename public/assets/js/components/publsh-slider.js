import Swiper from "swiper";
import "swiper/css";

const publshSlider = () => {
  var featureSlider = new Swiper(".home-features__slider", {
    slidesPerView: "auto",
    spaceBetween: 40,
    allowTouchMove: true,
    breakpoints: [
      {
        992: {
          allowTouchMove: false,
        },
      },
    ],
  });
  return { featureSlider };
};

export default publshSlider;
