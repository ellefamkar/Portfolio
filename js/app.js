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



var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
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
})