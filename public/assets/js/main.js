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

// window.onscroll = () => {
//   if (
//     window.innerHeight + Math.round(window.scrollY) >=
//     document.body.offsetHeight - 300
//   ) {
//     document
//       .querySelector(".btn-enquiry-wrap")
//       .classList.add("btn-enquiry-hide");
//   } else {
//     document
//       .querySelector(".btn-enquiry-wrap")
//       .classList.remove("btn-enquiry-hide");
//   }
// };

if (isDesktop) {
  gsap.registerPlugin(ScrollTrigger);

  // #FIXME uncomment this

  ScrollTrigger.create({
    trigger: ".home-banner",
    start: "center top+=30%",
    end: "bottom top",
    onEnter: () => {
      lenis.scrollTo(".home-video");
    },
  });

  gsap.ticker.fps(60);
  window.addEventListener("load", () => {
    setTimeout(() => {
      gsap.utils
        .toArray(".home-banner__title .wordInner")
        .forEach((word, i) => {
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
    }, 500);
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

  // video section
  const homeVideo = document.getElementById("home-video");
  const homeVideoPoster = document.querySelector(".home-video__poster");
  // if (homeVideo) {
  //   ScrollTrigger.create({
  //     trigger: ".home-video",
  //     start: "32% center",
  //     end: "bottom+=50% top",
  //     anticipatePin: 1,
  //     pin: ".home-video",
  //     toggleClass: "section-in",
  //     onEnter: () => {
  //       setTimeout(() => {
  //         homeVideo.play();
  //         homeVideoPoster.style.zIndex = -1;
  //         // document.querySelector('.home-video').style.backgroundColor = "#f6f3f6";
  //         document.querySelector(".home-video__title").classList.add("inView");
  //       }, 300);
  //     },
  //     onLeave: () => {
  //       homeVideo.pause();
  //       homeVideo.currentTime = 0;
  //       homeVideoPoster.style.zIndex = 2;
  //       // document.querySelector('.home-video').style.backgroundColor = "#f6f3f6";
  //       document.querySelector(".home-video__title").classList.remove("inView");
  //     },
  //     onEnterBack: () => {
  //       setTimeout(() => {
  //         homeVideo.play();
  //         homeVideoPoster.style.zIndex = -1;
  //         // document.querySelector('.home-video').style.backgroundColor = "#d1f386";
  //         document.querySelector(".home-video__title").classList.add("inView");
  //       }, 300);
  //     },
  //     onLeaveBack: () => {
  //       homeVideo.pause();
  //       homeVideo.currentTime = 0;
  //       homeVideoPoster.style.zIndex = 2;
  //       // document.querySelector('.home-video').style.backgroundColor = "#d1f386";
  //       document.querySelector(".home-video__title").classList.remove("inView");
  //     },
  //   });
  // }

  // #FIXME this is new section js
  const bannerHeight =
    document.querySelectorAll(".home-banner")[0].clientHeight;
  const videoWrapper = document.querySelectorAll(".home-video__frame")[0];
  const videoMainWrapper = document.querySelectorAll(".video-outer-wrap")[0];
  const aboutWrapper = document.querySelectorAll(".home-about")[0];
  const titleMain = document.querySelectorAll(".home-about__title")[0];

  // setTimeout(() => {
  //   const titleMain = document.querySelectorAll('.home-about__title')[0];
  //   titleMain.style.cssText += `left:${((window.innerWidth / 2) - (titleMain.clientWidth)) / 2}px; position:fixed;  top:${(window.innerHeight/ 2 - (titleMain.clientHeight / 2))}px;`;

  // }, 400);

  console.log(videoMainWrapper.clientHeight);
  aboutWrapper.style.marginTop = `-${videoMainWrapper.clientHeight}px`;

  if (homeVideo) {
    const trigger = ScrollTrigger.create({
      trigger: ".video-outer-wrap",
      start: `top top`,
      end: `bottom+=${videoMainWrapper.clientHeight * 2.6}px top`,
      anticipatePin: 1,
      pin: ".home-video",
      // toggleClass: "section-in",
      // markers: true,
    });

    //set clip amount
    gsap.set(videoWrapper, { clipPath: `circle(44vh)` });

    //initial clip size increase
    let clip_image = gsap.timeline({
      scrollTrigger: {
        trigger: ".video-outer-wrap",
        start: `top top`,
        end: `top+=${videoMainWrapper.clientHeight}px top`,
        // markers: true,
        scrub: true,
        onEnterBack: () => {
          document.querySelector("body").classList.remove("rm-bg");
        },
      },
    });
    clip_image.fromTo(
      videoWrapper,
      { clipPath: `circle(44vh)` },
      { clipPath: "circle(110vh)", duration: 1.5 }
    );
    //initial text revealing

    gsap.timeline({
      scrollTrigger: {
        trigger: ".video-outer-wrap",
        start: `top+=${videoMainWrapper.clientHeight * 0.9}px  top`,
        end: `top+=${videoMainWrapper.clientHeight * 1.5}px top`,
        // markers: true,
        scrub: true,
        onUpdate: (e) => {
          if (e.progress > 0 && e.progress < 1) {
            document
              .querySelector(".home-video__title")
              .classList.add("inView");
          } else {
            document
              .querySelector(".home-video__title")
              .classList.remove("inView");
          }
        },
      },
    });

    //initial clip size decrease
    let clip_image_rev = gsap.timeline({
      scrollTrigger: {
        trigger: ".video-outer-wrap",
        start: `top+=${videoMainWrapper.clientHeight * 1.4}px  top`,
        end: `top+=${videoMainWrapper.clientHeight * 2}px top`,
        scrub: true,
        // markers: true,
        onEnter: () => {
          document.querySelector("body").classList.add("rm-bg");
        },
      },
    });
    clip_image_rev.to(videoWrapper, { clipPath: "circle(44%)", duration: 1.5 });

    setTimeout(() => {
      const mainTitle = document
        .querySelectorAll(".main-title span")[0]
        .getBoundingClientRect();
      const containerLeft = document
        .querySelectorAll(".home-about .container")[0]
        .getBoundingClientRect();
      let clip_image_scale = gsap.timeline({
        scrollTrigger: {
          trigger: ".video-outer-wrap",
          start: `top+=${videoMainWrapper.clientHeight * 2}px  top`,
          end: `top+=${videoMainWrapper.clientHeight * 3}px top`,
          scrub: true,
          // markers: true,
        },
      });
      clip_image_scale.to(videoWrapper, {
        width: `225px`,
        height: `225px`,
        left: `${Math.round(mainTitle.left)}px`,
        onComplete: () => videoWrapper.classList.add("hide"),
        translate: `0% , -50%`,
      });

      // let text_movement = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: '.home-about',
      //     start: `top+=20% top`,
      //     end: "bottom-=30% center",
      //     scrub: true,
      //     // markers: true,
      //   }
      // });
      clip_image_scale.to(".home-about__title", {
        scale: 0.35,
        left: `${
          containerLeft.left +
          document.querySelectorAll(".home-about__title")[0].clientWidth / 2
        }px`,
        duration: 1.6,
        onReverseComplete: () => videoWrapper.classList.remove("hide"),
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".home-about",
          start: `bottom-=50% 30%`,
          end: "bottom bottom",
          scrub: true,
          // markers: true,
          onUpdate: (e) => {
            console.log(e.progress);
            if (e.progress === 1) {
              document
                .querySelector(".home-about__title")
                .classList.add("hide");
            } else {
              document
                .querySelector(".home-about__title")
                .classList.remove("hide");
            }
          },
        },
      });
    }, 10);

    // console.log(mainTitle.left);

    setTimeout(() => {
      trigger.refresh();
    }, 1000);
  }

  // about section
  // const title = document.querySelector(".home-about__title");
  // const text = title.textContent;

  // const regex = /(WH)(O)( WE ARE)/;
  // const matches = text.match(regex);

  // const wrappedText = `<span class="terminal-letters left">${matches[1]} </span><span id="pos-o-letter">${matches[2]}</span><span class="terminal-letters right"> ${matches[3]}</span>`;
  // title.innerHTML = wrappedText;

  const aboutTitle = document.querySelector(".home-about__title");
  if (aboutTitle) {
    gsap.from(aboutTitle, {
      scrollTrigger: {
        trigger: aboutTitle,
        start: "top bottom-=10%",
        onEnter: () => {
          aboutTitle.classList.add("inView");
        },
      },
    });
  }

  const featureTitle = document.querySelector(".home-features__title");
  if (featureTitle) {
    gsap.from(featureTitle, {
      scrollTrigger: {
        trigger: featureTitle,
        start: "bottom+=10% center",
        onEnter: () => {
          featureTitle.classList.add("inView");
        },
        onLeaveBack: () => {
          featureTitle.classList.remove("inView");
        },
      },
    });
  }

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

  gsap.utils.toArray(".anim-fade-up").forEach((elem) => {
    ScrollTrigger.create({
      trigger: elem,
      start: "top bottom-=30%",
      onEnter: () => {
        elem.classList.add("visible");
      },
    });
  });

  gsap.utils.toArray(".parallax-obj").forEach((obj, i) => {
    gsap.fromTo(
      obj,
      {
        yPercent: 10,
      },
      {
        yPercent: -5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: obj,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}
