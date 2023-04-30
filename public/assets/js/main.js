import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power2 } from "gsap/all";
import { Modal } from "bootstrap";
import splitText from "./components/splitText";
import brandsSlider from "./components/brands-slider";
import publshSlider from "./components/publsh-slider";
import serviceSlider from "./components/service-slider";

document.addEventListener("DOMContentLoaded", () => {
  const { brandsSliderTop, brandsSliderBottom } = brandsSlider();
});
const { featureSlider } = publshSlider();
const { workSlider, workTitleSlider } = serviceSlider();

const split = splitText();

const isDesktop = window.matchMedia("(min-width: 992px)").matches;

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

window.onload = () => {
  window.scrollTo(0, 0);
};

const enquiryModalSelector = document.getElementById("enquiryModal");
var enquiryModal = new Modal(enquiryModalSelector);
document.querySelectorAll(".btn-enquiry-popup").forEach((btn) => {
  btn.addEventListener("click", () => {
    enquiryModal.toggle();
  });
});
enquiryModalSelector.addEventListener("show.bs.modal", function (event) {
  lenis.stop();
});
enquiryModalSelector.addEventListener("hide.bs.modal", function (event) {
  lenis.start();
});

document
  .querySelectorAll(".enquiry-modal__form input, .enquiry-modal__form textarea")
  .forEach((input) => {
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

window.addEventListener("load", () => {
  setTimeout(() => {
    const enquiryTooltip = document.querySelector(".enquiry-tooltip");
    enquiryTooltip.classList.add("tooltip-hide");
  }, 5000);
});

if (isDesktop) {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: ".home-banner",
    start: "center top+=30%",
    end: "bottom top",
    onEnter: () => {
      lenis.scrollTo(".home-video");
    },
  });

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

  // gsap.utils.toArray(".text-reveal").forEach((elem) => {
  //   ScrollTrigger.create({
  //     trigger: 'text-reveal',
  //     start: "top center",
  //     end: "bottom center",
  //     toggleClass: 'inView',
  //     once: true,
  //     markers: true
  //   });
  // });

  // video section
  const homeVideo = document.getElementById("home-video");
  const homeVideoPoster = document.querySelector(".home-video__poster");
  ScrollTrigger.create({
    trigger: ".home-video",
    start: "32% center",
    end: "bottom+=50% top",
    anticipatePin: 1,
    pin: ".home-video",
    toggleClass: "section-in",
    onEnter: () => {
      setTimeout(() => {
        homeVideo.play();
        homeVideoPoster.style.zIndex = -1;
        // document.querySelector('.home-video').style.backgroundColor = "#f6f3f6";
        document.querySelector(".home-video__title").classList.add("inView");
      }, 300);
    },
    onLeave: () => {
      homeVideo.pause();
      homeVideo.currentTime = 0;
      homeVideoPoster.style.zIndex = 2;
      // document.querySelector('.home-video').style.backgroundColor = "#f6f3f6";
      document.querySelector(".home-video__title").classList.remove("inView");
    },
    onEnterBack: () => {
      setTimeout(() => {
        homeVideo.play();
        homeVideoPoster.style.zIndex = -1;
        // document.querySelector('.home-video').style.backgroundColor = "#d1f386";
        document.querySelector(".home-video__title").classList.add("inView");
      }, 300);
    },
    onLeaveBack: () => {
      homeVideo.pause();
      homeVideo.currentTime = 0;
      homeVideoPoster.style.zIndex = 2;
      // document.querySelector('.home-video').style.backgroundColor = "#d1f386";
      document.querySelector(".home-video__title").classList.remove("inView");
    },
  });

  // about section
  // const title = document.querySelector(".home-about__title");
  // const text = title.textContent;

  // const regex = /(WH)(O)( WE ARE)/;
  // const matches = text.match(regex);

  // const wrappedText = `<span class="terminal-letters left">${matches[1]} </span><span id="pos-o-letter">${matches[2]}</span><span class="terminal-letters right"> ${matches[3]}</span>`;
  // title.innerHTML = wrappedText;

  gsap.from(".home-about__title", {
    scrollTrigger: {
      trigger: ".home-about__title",
      start: "top bottom-=10%",
      onEnter: () => {
        document.querySelector(".home-about__title").classList.add("inView");
      },
    },
  });

  gsap.from(".home-features__title", {
    scrollTrigger: {
      trigger: ".home-features__title",
      start: "bottom+=10% center",
      onEnter: () => {
        document.querySelector(".home-features__title").classList.add("inView");
      },
      onLeaveBack: () => {
        document
          .querySelector(".home-features__title")
          .classList.remove("inView");
      },
    },
  });

  // feature section
  gsap.utils
    .toArray(".home-features__slider.slider-desk .swiper-wrapper")
    .forEach((container) => {
      let children = gsap.utils.toArray(container.children);
      let tlFeatures = gsap.timeline({
        scrollTrigger: {
          trigger: container.closest("section"),
          start: "center center",
          end: `+=${container.offsetWidth * 3}`,
          anticipatePin: 1,
          scrub: true,
          force3D: true,
          useCSS: true,
          pin: container.closest("section"),
          toggleClass: "section-in",
        },
      });
      tlFeatures.addPause();
      tlFeatures.delay(10);
      let changeFeatureSlider = () =>
        featureSlider.slideTo(
          tlFeatures.scrollTrigger.direction < 0
            ? featureSlider.activeIndex - 1
            : featureSlider.activeIndex + 1
        );

      children.forEach((child, i) =>
        tlFeatures.add(changeFeatureSlider, i + 1)
      );
      tlFeatures.set({}, { delay: 1 });
    });

  const serviceSliderSec = document.querySelector(".service-slider-sec");
  setTimeout(() => {
    ScrollTrigger.create({
      trigger: serviceSliderSec,
      start: "top+=33 bottom-=117",
      end: `+=${serviceSliderSec?.closest(".pin-spacer")?.offsetHeight}`,
      onEnter: () => {
        document.querySelector(".btn-enquiry").classList.remove("btn-primary");
        document.querySelector(".btn-enquiry").classList.add("btn-green");
        document.querySelector(".enquiry-tooltip").classList.add("green");
        document.querySelector(".enquiry-modal").classList.add("green");
      },
      onLeave: () => {
        document.querySelector(".btn-enquiry").classList.add("btn-primary");
        document.querySelector(".btn-enquiry").classList.remove("btn-green");
        document.querySelector(".enquiry-tooltip").classList.remove("green");
        document.querySelector(".enquiry-modal").classList.remove("green");
      },
      onEnterBack: () => {
        document.querySelector(".btn-enquiry").classList.remove("btn-primary");
        document.querySelector(".btn-enquiry").classList.add("btn-green");
        document.querySelector(".enquiry-tooltip").classList.add("green");
        document.querySelector(".enquiry-modal").classList.add("green");
      },
      onLeaveBack: () => {
        document.querySelector(".btn-enquiry").classList.add("btn-primary");
        document.querySelector(".btn-enquiry").classList.remove("btn-green");
        document.querySelector(".enquiry-tooltip").classList.remove("green");
        document.querySelector(".enquiry-tooltip").classList.remove("green");
      },
    });
  }, 100);

  // Service Slider
  const serviceSlider = document.querySelector(".service-slider");
  if (serviceSlider) {
    gsap.utils
      .toArray(".service-slider .swiper-wrapper")
      .forEach((container) => {
        let children = gsap.utils.toArray(container.children);
        let tlService = gsap.timeline({
          scrollTrigger: {
            trigger: container.closest("section"),
            start: "center center",
            end: `+=${container.offsetWidth * 6}`,
            anticipatePin: 1,
            scrub: true,
            force3D: true,
            useCSS: true,
            pin: container.closest("section"),
            toggleClass: "section-in",
          },
        });
        let changeWorkSlider = () =>
          workSlider.slideTo(
            tlService.scrollTrigger.direction < 0
              ? workSlider.activeIndex - 1
              : workSlider.activeIndex + 1
          );

        children.forEach((child, i) => tlService.add(changeWorkSlider, i + 1));
        tlService.set({}, { delay: 1 });
      });

    let sliderMouseOver = false;
    serviceSlider.addEventListener("mouseenter", () => {
      sliderMouseOver = true;
    });
    serviceSlider.addEventListener("mouseleave", () => {
      sliderMouseOver = false;
    });

    const serviceCursor = document.getElementById("view-service-cursor");
    serviceSlider.addEventListener("mousedown", () => {
      gsap.to(serviceCursor, 0.5, {
        scale: 0.6,
        ease: Power2.easeOut,
      });
    });

    serviceSlider.addEventListener("mouseup", () => {
      gsap.to(serviceCursor, 0.5, {
        scale: 1,
        ease: Power2.easeOut,
      });
    });

    document.addEventListener("mousemove", (e) => {
      var { clientX, clientY } = e;
      const clientLeft = clientX;
      const clientTop = clientY;
      if (sliderMouseOver) {
        gsap.to(serviceCursor, 0.5, {
          opacity: 1,
          scale: 1,
          left: clientLeft,
          top: clientTop,
          ease: Power2.easeOut,
        });
      } else {
        gsap.to(serviceCursor, 0.3, {
          opacity: 0,
          left: clientLeft,
          top: clientTop,
          ease: Power2.easeOut,
        });
        gsap.to(serviceCursor, 1, {
          scale: 0.5,
          ease: Power2.easeOut,
        });
      }
    });
  }
}
