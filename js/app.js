// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin( Draggable , MotionPathPlugin, TextPlugin);

// Draggable.create("#draggable", {
//     type:"x",
//     bounds: document.getElementById("title"),
//     inertia: true,
//     onClick: function() {
//          console.log("clicked");
//     },
//     onDragEnd: function() {
//          console.log("drag is complete");
//     }
// });



gsap.from(".title", {
    duration: 5,
    scale: 0.9, 
    opacity: 0, 
    delay: 0.02, 
    // yPercent: 50,
    stagger: 0.3,
    // ease: "elastic", 
    force3D: true
  });

let tl = gsap.timeline();

tl.from("h1 span", {
  duration: 0.75,
  y: 150,
  scale: 0.9, 
  autoAlpha: 0,
  ease: Power3.out,
  stagger: 1.5
}).from("li", {
  duration: 0.75,
  x: 300,
  autoAlpha: 0,
  ease: "elastic.out(1, 1)",
  stagger: {
    each: 0.75,
    amount: 0.5
  }
}, "+=0.25");


// const myText = document.querySelector(".title-one");
// gsap.to(".char",{
//     y:0,
//     stagger: 0.05,
//     delay: 0.2,
//     duration: 0.1
// })