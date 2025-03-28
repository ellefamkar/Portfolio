
let body = document.querySelector('body');
let cursor = document.querySelector('.js-cursor-outline');
let cursorCircle = document.querySelector(".js-cursor-inline");
let containerSlider = document.querySelector(".container-slider");
const form = document.getElementById("form");
const result = document.getElementById("result");
let circleStyle = cursorCircle?.style || {};
let links = document.querySelectorAll("a");
let image = document.querySelectorAll("img");
let target = document.querySelector('.js-bg');
let imageMenuItems = document.querySelectorAll('.img-nav-item');

// gsap.registerPlugin(ScrollTrigger);
let sections = gsap.utils.toArray(".js-panel");
let contactSections = gsap.utils.toArray(".js-contact-panel");
let documentTitle = document.title;

// Register GSAP ScrollTrigger if available
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
}

window.addEventListener("blur", () => {
  document.title = " 😍 See you soon!";
});
window.addEventListener("focus", () => {
  document.title = documentTitle;
});

document.addEventListener("DOMContentLoaded", () => {

body.style.visibility = "visible";

let cTitleImage = document.querySelector(".c-title-img");
let cScroll = document.querySelector(".c-scroll");
let jsTypeWriter = document.querySelector(".js-typewriter");

let tl = gsap.timeline();

// gsap.from(".main-title", {
//     duration: 5,
//     ease: "power4.out",
//     scale: 0.9, 
//     opacity: 0, 
//     delay: 0.02, 
//     yPercent: -50,
//     skewX: 5,
//     stagger: {
//       amount: 0.3
//     },
//     // ease: "elastic", 
//     force3D: true
// });

if(image){
  tl.from("img",{
    duration: 0.85,
    scale: 0.9, 
    ease: "Power3",
  });
}

// import { gsap, Power0, Power1, Power2, Power3, Power4, Linear, Quad, Cubic, Quart, Quint, Strong, Elastic, Back, SteppedEase, Bounce, Sine, Expo, Circ, TweenLite, TimelineLite, TimelineMax } from "./gsap-core.js";
if(cTitleImage){
  tl.from(cTitleImage,{
    duration: 1.5,
    ease: "Power3.out",
    scale: 0.9, 
    autoAlpha: 0,
    opacity: 0, 
    stagger: {
      amount: 0.3
    }
  });
}

if (document.querySelector("h1 span")) {
  tl.from("h1 span", 1.3, {
    duration: 0.85,
    y: 150,
    scale: 0.9, 
    autoAlpha: 0,
    ease: "Power3.out",
    stagger: 1.5
  });
}

tl.from("li", {
  duration: 1,
  x: 200,
  autoAlpha: 0,
  ease: "elastic.out(1, 1)",
  stagger: {
    each: 0.75,
    amount: 0.5
  }
}, "+=0.25");

if(cScroll){
  tl.from(".c-scroll",{
    duration: 1,
    ease: "power4",
    scale: 0.9, 
    autoAlpha: 0,
    opacity: 0
  });
}

let tlx = new TimelineMax({
    paused:true
  });
  // letter animation
  if(jsTypeWriter){
    tlx.fromTo(jsTypeWriter, 5, {
      width: "0",
    }, {
      width: "10em", /* same as CSS .line-1 width */
      ease:  SteppedEase.config(77)
    }, 0);
    // text cursor animation
    tlx.fromTo(jsTypeWriter, 0.5, {
      "border-right-color": "rgba(255,255,255,0.75)",
      repeat: 0,
    }, {
      "border-right-color": "rgba(255,255,255,0)",
      // repeat: -1,
      ease:  SteppedEase.config(77)
    }, 0);
  }
  
  tlx.play();

});

// mouse and cursor events 
if (cursor && cursorCircle) {
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

};

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

// horizontal panel on scroll
if(body.classList.contains("o-scrollable-body") &&  window.innerWidth > 768){

  function toggleBg(entries, observer) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        body.classList.toggle('is-light');
      } else {
        entry.target.classList.remove('in-viewport');
      }
    });
  }
  let observer = new IntersectionObserver(toggleBg, {threshold: .2});
  observer.observe(target);
}

if(containerSlider && sections.length > 0){
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: containerSlider,
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      // base vertical scrolling on how wide the container is so it feels more natural.
      end: "+=3500",
    }
  });
}

// mobile menu with GSAP
function menu() {
  let menuInner = $(".js-menu-inner"),
    menuTrigger = $(".js-menu-trigger"),
    menuInnerBackgroundItem = $(".js-menu-inner-background").find("i"),
    menuItem = $(".js-menu-items-list").find("li"),
    menuItemsShape = $(".js-menu-items-shape"),
    menuClose = $(".js-menu-close"),
    timeline = new TimelineMax({
      paused: true
    }),
    logoShape = $(".js-logo-shape"),
    logoShapePath =
      "M 189,80.37 C 243,66.12 307.3,87.28 350.9,124.1 389.3,156.6 417,211.2 418.1,263.4 419.1,305.7 401.8,355.6 368.5,379.1 298.8,428 179.2,446.4 117.6,386.3 65.4,335.3 78.55,230.3 105.5,160.5 119.7,123.6 152.6,89.85 189,80.37 Z",
    _self,
    linksWrapper = $(".js-menu-items-wrapper"),
    linksItems = $(".js-menu-items-list").find("li"),
    activeItem = $(".js-menu-item.is-active"),
    activeItemPosition = activeItem.position().top,
    menuItemsShapePath = $(".js-items-shape-path"),
    topOffset = 8;

  timeline
    .to(
      menuInner,
      1,
      {
        autoAlpha: 1,
        ease: Power4.easeOut
      },
      "start"
    )
    .fromTo(
      menuInnerBackgroundItem,
      0.25,
      {
        x: "-100%",
        autoAlpha: 0
      },
      {
        x: "0%",
        autoAlpha: 1,
        ease: Power1.easeOut
      },
      "start"
    )
    .staggerFromTo(
      menuItem,
      0.4,
      {
        x: -30,
        autoAlpha: 0
      },
      {
        x: 0,
        autoAlpha: 1,
        delay: 0.35,
        ease: Back.easeOut.config(1)
      },
      0.15,
      "start"
    )
    .fromTo(
      menuItemsShape,
      0.25,
      {
        scale: 0.7,
        autoAlpha: 0
      },
      {
        scale: 1,
        autoAlpha: 1,
        delay: 0.95,
        ease: Back.easeOut.config(1.7)
      },
      "start"
    )
    .fromTo(
      menuClose,
      0.2,
      {
        x: -10,
        autoAlpha: 0
      },
      {
        x: 0,
        autoAlpha: 1,
        delay: 1,
        ease: Power1.easeOut
      },
      "start"
    );

  function _logoShapeAnimation() {
    TweenMax.to(logoShape, 3, {
      attr: { d: logoShapePath },
      repeat: -1,
      yoyo: true,
      ease: Power0.easeNone
    });
  }

  function _hoverAnimation() {
    TweenMax.set(menuItemsShape, {
      y: activeItemPosition + topOffset
    });

    linksItems.on({
      mouseenter: function() {
        _self = $(this);
        var selfParent = _self.closest(linksWrapper),
          targetCircle = selfParent.find(menuItemsShape),
          circlePosition = _self.position().top;

        TweenMax.to(targetCircle, 0.4, {
          y: circlePosition + topOffset,
          ease: Power2.easeOut
        });

        TweenMax.to(menuItemsShapePath, 1, { morphSVG: this.dataset.morph });
      }
    });

    linksWrapper.on({
      mouseleave: function() {
        _self = $(this);
        var selfParent = _self.closest(linksWrapper),
          activeLink = selfParent.find(activeItem),
          targetCircle = selfParent.find(menuItemsShape),
          activeLinkPosition = activeLink.position().top;

        TweenMax.to(targetCircle, 0.4, {
          y: activeLinkPosition + topOffset,
          ease: Power2.easeOut
        });

        TweenMax.to(menuItemsShapePath, 1, { morphSVG: menuItemsShapePath });
      }
    });
  }

  menuTrigger.on("click", function() {
    timeline.play();

    if(document.body.classList.contains("o-contact-container") ||
    document.body.classList.contains("o-portfolio-container")){
      const menuContainer = document.querySelector(".o-menu-container");
      menuContainer.style.zIndex = "1";
    }

    if (!document.body.classList.contains("o-about-container")) {
      const cpanels = document.querySelectorAll(".c-panel");
      cpanels.forEach((item) => item.style.zIndex = "0");
    }
    
  });

  menuClose.on("click", function() {
    timeline.timeScale(1.25);
    timeline.reverse();

    if(document.body.classList.contains("o-contact-container") ||
  document.body.classList.contains("o-portfolio-container")){
    const menuContainer = document.querySelector(".o-menu-container");
    // const cpanels = document.querySelectorAll(".c-panel");
    // cpanels.forEach((item) => item.style.zIndex = "1");
    menuContainer.style.zIndex = "0";
    }
  });

  _logoShapeAnimation();
  _hoverAnimation();
}
menu();

// image hover menu 
imageMenuItems.forEach((el) => {
  const image = el.querySelector('img');

  el.addEventListener('mouseenter', (e) => {
    gsap.to(image, { autoAlpha: 1 })
  });

   el.addEventListener('mouseleave', (e) => {
    gsap.to(image, { autoAlpha: 0 })
  });
  
  el.addEventListener('mousemove', (e) => {
    gsap.set(image, { x: e.offsetX - 200 })
  })
})

$('.js-contact-input').keyup(function() {
  if( $(this).val() ) {
     $(this).addClass('not-empty');
  } else {
     $(this).removeClass('not-empty');
  }
});

if (window.innerWidth <= 768) {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

if(form){
  form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    let object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    let json = JSON.stringify(object);
    result.innerHTML = "Please wait...";
  
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerHTML = json.message;
        } else {
          console.log(response);
          result.innerHTML = json.message;
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          result.style.display = "none";
        }, 5000);
      });
  });
}

console.clear();

