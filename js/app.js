// cursor 

let cursor = document.querySelector('.js-cursor-outline');
let cursorCircle = document.querySelector(".js-cursor-inline");
let circleStyle = cursorCircle.style;
let links = document.querySelectorAll("a");
let images = document.querySelectorAll("img");

document.addEventListener('mousemove', function(e){
  window.requestAnimationFrame(() => {
    circleStyle.top = `${e.clientY - cursorCircle.offsetHeight / 2}px`;
    circleStyle.left = `${e.clientX - cursorCircle.offsetWidth / 2}px`;
  });
  let x = e.clientX;
  let y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
  cursorCircle.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
  cursorCircle.classList.remove('cursorinnerhover')
});

links.forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    cursorCircle.classList.add("enlarged");
  });
  link.addEventListener("mouseout", (e) => {
    cursorCircle.classList.remove("enlarged");
  });
  link.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  link.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});


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
    ease: "power4.out",
    scale: 0.9, 
    opacity: 0, 
    delay: 0.02, 
    yPercent: -50,
    skewX: 5,
    stagger: {
      amount: 0.3
    },
    // ease: "elastic", 
    force3D: true
  });


let tl = gsap.timeline();

tl.from(".home-img",{
  duration: 0.85,
  scale: 0.9, 
  ease: "Power3",
}).from("h1 span", 1.8, {
  duration: 0.85,
  y: 150,
  scale: 0.9, 
  autoAlpha: 0,
  ease: "Power3.out",
  stagger: 1.5
}).from("li", {
  duration: 1,
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


