import Swiper from "swiper";
import "swiper/css";

const serviceSlider = () => {
  var workSlider = new Swiper(".service-slider", {
    slidesPerView: 1.04,
  });
  return { workSlider };
};

export default serviceSlider;
