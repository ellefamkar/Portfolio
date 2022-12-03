// cursor 

let cursor = document.querySelector('.cursor-outline');
let cursorinner = document.querySelector('.cursor2');
let a = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e){
  let x = e.clientX;
  let y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  let x = e.clientX;
  let y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});


const circle = document.getElementById("circle-cursor");
const links = document.querySelectorAll("a,button,input,.js-big-cursor");
const circleStyle = circle.style;

links.forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    circle.classList.add("enlarged");
  });
  link.addEventListener("mouseout", (e) => {
    circle.classList.remove("enlarged");
  });
});

document.addEventListener("mousemove", (e) => {
  window.requestAnimationFrame(() => {
    circleStyle.top = `${e.clientY - circle.offsetHeight / 2}px`;
    circleStyle.left = `${e.clientX - circle.offsetWidth / 2}px`;
  });
});





const mouseCursor = document.getElementById("mouse_cursor");
const li = document.querySelectorAll("li");
const line = document.querySelector(".menu_btn :nth-child(1)");
const menu = document.querySelector(".menu_btn");

menu.addEventListener("mouseover", () => {
  line.style.width = `100%`;

  setTimeout(() => {
    line.style.marginBottom = `0.7em`;
  }, 530);
});

menu.addEventListener("mouseleave", () => {
  line.style.width = `30px`;

  setTimeout(() => {
    line.style.marginBottom = `0.3em`;
  }, 530);
});

let cursorX = 0,
  cursorY = 0,
  currentX = 0,
  currentY = 0;

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

window.addEventListener("mousemove", (e) => {
  mouseCursor.style.display = "inline-block";
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function styling(s) {
  mouseCursor.style.width = `${s}px`;
  mouseCursor.style.height = `${s}px`;
}

menu.a;

li.forEach((l) => {
  l.addEventListener("mouseover", () => {
    styling(90);
  });

  l.addEventListener("mouseleave", () => {
    styling(50);
  });
});

function animate() {
  currentX = lerp(currentX, cursorX, 0.05);
  currentY = lerp(currentY, cursorY, 0.05);
  mouseCursor.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) `;
  requestAnimationFrame(animate);
}

animate();











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


