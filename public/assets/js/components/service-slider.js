import Swiper, { EffectFade, Controller } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

Swiper.use([EffectFade, Controller]);

const serviceSlider = () => {
  var workSlider = new Swiper(".service-slider", {
    slidesPerView: 1.1,
    speed: 1000,
  });
  var workTitleSlider = new Swiper(".service-title-slider", {
    slidesPerView: 1,
    speed: 1000,
    effect: "fade",
  });
  workSlider.controller.control = workTitleSlider;
  workTitleSlider.controller.control = workSlider;
  return { workSlider, workTitleSlider };
};

export default serviceSlider;
