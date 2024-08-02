import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const genericAnimation = (className) => {
  return gsap.context(() => {
    gsap.fromTo(
      `.${className}`,
      {
        opacity: 0,
        y: `5rem`,
      },
      {
        duration: 0.5,
        opacity: 1,
        stagger: 0.1,
        y: 0,
        scrollTrigger: {
          trigger: `.${className}`,
          // start: `top 5%`,
        },
      }
    )
  })
}

export const spin = (className) => {
  return gsap.context(() => {
    gsap.to(`.${className}`, {
      duration: 20,
      rotate: className === `spin-reverse` ? `-360deg` : `360deg`,
      yoyo: true,
      repeat: -1,
      ease: `slow(0.5, 0.8)`,
      scrollTrigger: {
        trigger: `.${className}`,
        // start: `top 50%`,
      },
    })
  })
}

// export const float = (className) => {
//   let xValue = Math.random() * 100
//   let yValue = Math.random() * 100

//   return gsap.context(() => {
//     gsap.fromTo(
//       `.${className}`,
//       { opacity: 0.5, x: `${100}vw`, y: `${100}` },
//       { duration: 100, opacity: 0.5, x: `100vw` }
//     )
//   })
// }

export const routeAnimation = (contextRef) => {
  return gsap.context(() => {
    gsap.fromTo(
      `.route`,
      { opacity: 0, y: `-1rem` },
      {
        duration: 1.5,
        opacity: 1,
        y: 0,
      }
    )
  }, contextRef)
}

export const SCALE_ANIMATION = (className, contextRef) => {
  return gsap.context(() => {
    gsap.fromTo(
      `.${className}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.5,
        opacity: 1,
        stagger: 0.2,
        scale: 1,
        scrollTrigger: {
          trigger: `.${className}`,
          // start: `top 50%`,
        },
      }
    )
  }, contextRef)
}

export const GALLERY_TEXT_ANIMATION = (contextRef) => {
  return gsap.context(() => {
    gsap.fromTo(
      `.slideText`,
      { opacity: 0, x: `-10rem` },
      {
        duration: 1,
        x: window.innerWidth <= 767 ? 0 : `-15rem`,
        opacity: 1,
        scrollTrigger: {
          trigger: `.slideText`,
          // start: `top center`,
        },
      }
    )
  }, contextRef)
}

// ======================================================================================

export const TAKE_A_COURSE_ANIMATION = () => {
  const scrollTrigger = {
    // markers: true,
    trigger: `.img`,
    start: `top 80%`,
    // toggleActions: `play pause none none`,
  }

  return gsap.context(() => {
    gsap.fromTo(`.angle`, { opacity: 0, x: `5rem`, y: `-5rem` }, { scrollTrigger, duration: 0.5, opacity: 1, x: 0, y: 0 })
    gsap.fromTo(
      `.img`,
      { scale: 0 },
      {
        scrollTrigger,
        duration: 1,
        scale: 0.9,
      }
    )
    gsap.fromTo(`.box`, { opacity: 0, x: `-5rem`, y: `5rem` }, { scrollTrigger, duration: 0.5, opacity: 1, x: 0, y: 0 })
  })
}

export const STEPPER_IMG_ANIMATION = (contextRef) => {
  return gsap.context(() => {
    gsap.fromTo(
      `.img1`,
      { y: `-25rem` },
      {
        scrollTrigger: {
          trigger: `.img1`,
          start: `bottom center`,
        },
        duration: 1,
        y: 0,
      }
    )
    gsap.fromTo(
      `.img2`,
      { y: `25rem` },
      {
        scrollTrigger: {
          trigger: `.img2`,
        },
        duration: 1,
        y: 0,
      }
    )
  }, contextRef)
}

export const COURSE_BANNER_ANIMATION = (contextRef) => {
  return gsap.context(() => {
    gsap.fromTo(`.courseBanner`, { y: `10rem` }, { duration: 1, opacity: 1, y: 0 })
  }, contextRef)
}
export const REACT_IMG_ANIMATION = (contextRef) => {
  return gsap.context(() => {
    gsap.to(`.react-img`, {
      duration: 5,
      rotate: `360deg`,
    })
  }, contextRef)
}
export const TESTIMONIAL_BANNER_ANIMATION = (contextRef) => {
  return gsap.context(() => {
    gsap.fromTo(
      `.testimonialBanner`,
      {
        transform: 'perspective(1200px) translateX(0px) translateY(-59.781px) scale(0.950365) rotate(0deg) rotateX(9.92701deg) rotateY(0deg) translateZ(0px)',
      },
      {
        scrollTrigger: {
          trigger: `.testimonialBanner`,
          start: `top 90%`,
          end: `bottom 55%`,
          scrub: true,
        },
        duration: 2,
        transform: 'perspective(1200px)',
      }
    )
  }, contextRef)
}
