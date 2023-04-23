import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import brandsSlider from "./components/brands-slider";
import publshSlider from "./components/publsh-slider";
import splitText from "./components/splitText";
import { Modal } from "bootstrap";

document.addEventListener("DOMContentLoaded", () => {
  const { brandsSliderTop, brandsSliderBottom } = brandsSlider();
});
const { featureSlider } = publshSlider();

const split = splitText();

const lenis = new Lenis({
  duration: 1.8,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document
  .querySelectorAll(".enquiry-modal__form input, .enquiry-modal__form textarea")
  .forEach(function (input) {
    input.addEventListener("focus", () => {
      input.closest(".form-group").classList.add("focused");
    });

    input.addEventListener("blur", () => {
      const value = input.value.trim();
      const formGroup = input.closest(".form-group");

      if (value === "") {
        formGroup.classList.remove("filled", "focused");
      } else {
        formGroup.classList.add("filled");
      }
    });
  });

var enquiryModal = new Modal(document.getElementById("enquiryModal"));
document.querySelector(".btn-enquiry").addEventListener("click", () => {
  enquiryModal.toggle();
});

const enquiryModalSelector = document.getElementById("enquiryModal");
enquiryModalSelector.addEventListener("show.bs.modal", function (event) {
  lenis.stop();
});
enquiryModalSelector.addEventListener("hide.bs.modal", function (event) {
  lenis.start();
});

gsap.registerPlugin(ScrollTrigger);

gsap.ticker.fps(60);
gsap.utils.toArray(".home-banner__title .wordInner").forEach((word, i) => {
  gsap.to(word, {
    y: 0,
    duration: 0.4,
    ease: "Sine.easeOut",
    scaleY: 1,
    onComplete: () => {
      gsap.to(".home-banner__description > *", {
        y: 0,
        duration: 0.4,
        ease: "Sine.easeOut",
        opacity: 1,
        delay: 0.8,
        onComplete: () => {
          gsap.to(".banner-btn > *", {
            y: 0,
            duration: 0.4,
            ease: "Sine.easeOut",
            opacity: 1,
            onComplete: () => {
              gsap.to(".home-video .video-outer-wrap", {
                y: 0,
                duration: 0.5,
                ease: "Sine.easeOut",
                opacity: 1,
              });
            },
          });
        },
      });
    },
  });
});

gsap.to(".btn-enquiry", {
  y: 0,
  duration: 0.5,
  ease: "Sine.easeOut",
  opacity: 1,
  delay: 1,
  onComplete: () => {
    gsap.to(".enquiry-tooltip", {
      x: "-100%",
      duration: 0.5,
      ease: "Sine.easeOut",
      opacity: 1,
    });
  },
});

window.addEventListener("load", () => {
  setTimeout(() => {
    const enquiryTooltip = document.querySelector(".enquiry-tooltip");
    enquiryTooltip.classList.add("tooltip-hide");
  }, 5000);
});

// video section
const imageWrap = document.querySelector(".home-video .video-wrap");
let progress = 0;

ScrollTrigger.create({
  trigger: ".home-video",
  start: "32% center",
  end: "bottom top",
  anticipatePin: 1,
  pin: ".home-video",
  toggleClass: "section-in",
});

// feature section
gsap.utils
  .toArray(".home-features__slider .swiper-wrapper")
  .forEach((container) => {
    let children = gsap.utils.toArray(container.children);
    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: container.closest("section"),
        start: "center center",
        end: `+=${container.offsetWidth * 2}`,
        anticipatePin: 1,
        scrub: true,
        force3D: true,
        useCSS: true,
        pin: container.closest("section"),
        toggleClass: "section-in",
      },
    });
    let changeFeatureSlider = () =>
      featureSlider.slideTo(
        tl2.scrollTrigger.direction < 0
          ? featureSlider.activeIndex - 1
          : featureSlider.activeIndex + 1
      );
    children.forEach((child, i) => tl2.add(changeFeatureSlider, i + 1));
    tl2.set({}, { delay: 1 });
  });
