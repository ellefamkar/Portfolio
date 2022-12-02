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
    duration: 3,
    scale: 0.9, 
    opacity: 0, 
    delay: 0.2, 
    stagger: 0.3,
    ease: "elastic", 
    force3D: true
  });
