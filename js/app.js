// gsap.registerPlugin(ScrollTrigger);

gsap.from(".title", {
    duration: 3,
    scale: 2, 
    opacity: 0, 
    delay: 0.5, 
    stagger: 0.3,
    ease: "elastic", 
    force3D: true
  });
