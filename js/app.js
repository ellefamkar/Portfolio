// cursor 

const body = document.querySelector('body');
let cursor = document.querySelector('.js-cursor-outline');
let cursorCircle = document.querySelector(".js-cursor-inline");
let circleStyle = cursorCircle.style;
let links = document.querySelectorAll("a");
let image = document.querySelectorAll("img");

document.addEventListener("DOMContentLoaded", () => {

  gsap.from(".main-title", {
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

tl.from("img",{
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
  x: 200,
  autoAlpha: 0,
  ease: "elastic.out(1, 1)",
  stagger: {
    each: 0.75,
    amount: 0.5
  }
}, "+=0.25");



var tlx = new TimelineMax({
    paused:true
  });
  // letter animation
  tlx.fromTo(".anim-typewriter", 5, {
    width: "0",
  }, {
    width: "10em", /* same as CSS .line-1 width */
    ease:  SteppedEase.config(77)
  }, 0);
  // text cursor animation
  tlx.fromTo(".anim-typewriter", 0.5, {
    "border-right-color": "rgba(255,255,255,0.75)",
    repeat: 0,
  }, {
    "border-right-color": "rgba(255,255,255,0)",
    // repeat: -1,
    ease:  SteppedEase.config(77)
  }, 0);
  
  tlx.play();


})


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


// --------------------

function toggleBg(entries, observer) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      body.classList.toggle('is-light');
    } else {
      entry.target.classList.remove('in-viewport');
    }
  });
}

let target = document.querySelector('.js-bg');
let observer = new IntersectionObserver(toggleBg, {threshold: .2});

observer.observe(target);


// let tl = gsap.timeline({})
// tl.from(".textList li",{opacity:0,x : -100,stagger:0.3})



// ------------------------
gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".js-panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container-slider",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: "+=3500",
  }
});

