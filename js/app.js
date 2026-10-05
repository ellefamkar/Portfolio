let body = document.querySelector("body");
let containerSlider = document.querySelector(".container-slider");
const form = document.getElementById("form");
const result = document.getElementById("result");
let links = document.querySelectorAll("a");
let image = document.querySelectorAll("img");
let target = document.querySelector(".js-bg");
let imageMenuItems = document.querySelectorAll(".img-nav-item");

// gsap.registerPlugin(ScrollTrigger);
let sections = gsap.utils.toArray(".js-panel");
let contactSections = gsap.utils.toArray(".js-contact-panel");
let documentTitle = document.title;

// Register GSAP ScrollTrigger if available
if (typeof gsap !== "undefined" && gsap.registerPlugin) {
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
  let orbit = document.querySelector(".orbit");

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

  if (image) {
    tl.from("img", {
      duration: 0.85,
      scale: 0.9,
      ease: "power3.out",
    });
  }

  // import { gsap, Power0, Power1, Power2, Power3, Power4, Linear, Quad, Cubic, Quart, Quint, Strong, Elastic, Back, SteppedEase, Bounce, Sine, Expo, Circ, TweenLite, TimelineLite, TimelineMax } from "./gsap-core.js";
  if (cTitleImage) {
    tl.from(cTitleImage, {
      duration: 1.5,
      ease: "Power3.out",
      scale: 0.9,
      stagger: {
        amount: 0.3,
      },
    });
  }

  // The homepage hero (.js-hero) has its own CSS entrance, so it skips this one
  if (document.querySelector("h1 span") && !document.querySelector(".js-hero")) {
    tl.from("h1 span", {
      duration: 0.85,
      y: 150,
      scale: 0.9,
      autoAlpha: 0,
      ease: "Power3.out",
      stagger: 1.5,
    });

    if (cTitleImage) {
      tl.to(
        cTitleImage,
        {
          duration: 2.15,
          opacity: 0.2,
          ease: "none",
        },
        "<",
      );
    }

    if (orbit) {
      tl.to(
        orbit,
        {
          duration: 2.15,
          opacity: 0.4,
          ease: "none",
        },
        "<",
      );
    }
  }

  tl.from(
    "header:not(.c-site-header) span, header .nav-item, .download-resume-btn",
    {
      duration: 1,
      x: 200,
      autoAlpha: 0,
      ease: "elastic.out(1, 1)",
      stagger: {
        each: 0.75,
        amount: 0.5,
      },
    },
    "+=0.25",
  );

  if (cScroll) {
    tl.from(".c-scroll", {
      duration: 1,
      ease: "power4",
      scale: 0.9,
      autoAlpha: 0,
      opacity: 0,
    });
  }

  let tlx = new TimelineMax({
    paused: true,
  });
  // letter animation

  if (jsTypeWriter) {
    if (window.innerWidth < 768) {
      tlx.fromTo(
        jsTypeWriter,
        5,
        {
          width: "90%",
        },
        {
          width: "90%" /* same as CSS .line-1 width */,
          ease: SteppedEase.config(77),
        },
        0,
      );
      tlx.fromTo(
        jsTypeWriter,
        0.5,
        {
          "border-right-color": "transparent",
          repeat: 0,
        },
        {
          "border-right-color": "transparent",
          // repeat: -1,
          ease: SteppedEase.config(77),
        },
        0,
      );
    } else {
      tlx.fromTo(
        jsTypeWriter,
        5,
        {
          width: "0",
        },
        {
          width: "15.7em" /* same as CSS .line-1 width */,
          ease: SteppedEase.config(77),
        },
        0,
      );
      tlx.fromTo(
        jsTypeWriter,
        0.5,
        {
          "border-right-color": "rgba(255,255,255,0.75)",
          repeat: 0,
        },
        {
          "border-right-color": "rgba(255,255,255,0)",
          // repeat: -1,
          ease: SteppedEase.config(77),
        },
        0,
      );
    }

    // text cursor animation
  }

  tlx.play();

  if (cTitleImage) {
    const titleImageBaseOpacity = 0.2;
    const fadeDistance = 400;

    const updateTitleImageOpacity = () => {
      const progress = Math.min(window.scrollY / fadeDistance, 1);
      gsap.to(cTitleImage, {
        opacity: titleImageBaseOpacity * (1 - progress),
        duration: 0.4,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("scroll", updateTitleImageOpacity, { passive: true });
  }
});

// horizontal panel on scroll
if (body.classList.contains("o-scrollable-body") && window.innerWidth > 768) {
  function toggleBg(entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        body.classList.toggle("is-light");
      } else {
        entry.target.classList.remove("in-viewport");
      }
    });
  }
  let observer = new IntersectionObserver(toggleBg, { threshold: 0.2 });
  observer.observe(target);
}

if (containerSlider && sections.length > 0) {
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
    },
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
      paused: true,
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
        ease: Power4.easeOut,
      },
      "start",
    )
    .fromTo(
      menuInnerBackgroundItem,
      0.25,
      {
        x: "-100%",
        autoAlpha: 0,
      },
      {
        x: "0%",
        autoAlpha: 1,
        ease: Power1.easeOut,
      },
      "start",
    )
    .staggerFromTo(
      menuItem,
      0.4,
      {
        x: -30,
        autoAlpha: 0,
      },
      {
        x: 0,
        autoAlpha: 1,
        delay: 0.35,
        ease: Back.easeOut.config(1),
      },
      0.15,
      "start",
    )
    .fromTo(
      menuItemsShape,
      0.25,
      {
        scale: 0.7,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        delay: 0.95,
        ease: Back.easeOut.config(1.7),
      },
      "start",
    )
    .fromTo(
      menuClose,
      0.2,
      {
        x: -10,
        autoAlpha: 0,
      },
      {
        x: 0,
        autoAlpha: 1,
        delay: 1,
        ease: Power1.easeOut,
      },
      "start",
    );

  function _logoShapeAnimation() {
    TweenMax.to(logoShape, 3, {
      attr: { d: logoShapePath },
      repeat: -1,
      yoyo: true,
      ease: Power0.easeNone,
    });
  }

  function _hoverAnimation() {
    TweenMax.set(menuItemsShape, {
      y: activeItemPosition + topOffset,
    });

    linksItems.on({
      mouseenter: function () {
        _self = $(this);
        var selfParent = _self.closest(linksWrapper),
          targetCircle = selfParent.find(menuItemsShape),
          circlePosition = _self.position().top;

        TweenMax.to(targetCircle, 0.4, {
          y: circlePosition + topOffset,
          ease: Power2.easeOut,
        });

        TweenMax.to(menuItemsShapePath, 1, { morphSVG: this.dataset.morph });
      },
    });

    linksWrapper.on({
      mouseleave: function () {
        _self = $(this);
        var selfParent = _self.closest(linksWrapper),
          activeLink = selfParent.find(activeItem),
          targetCircle = selfParent.find(menuItemsShape),
          activeLinkPosition = activeLink.position().top;

        TweenMax.to(targetCircle, 0.4, {
          y: activeLinkPosition + topOffset,
          ease: Power2.easeOut,
        });

        TweenMax.to(menuItemsShapePath, 1, { morphSVG: menuItemsShapePath });
      },
    });
  }

  menuTrigger.on("click", function () {
    timeline.play();

    if (
      document.body.classList.contains("o-contact-container") ||
      document.body.classList.contains("o-portfolio-container")
    ) {
      const menuContainer = document.querySelector(".o-menu-container");
      menuContainer.style.zIndex = "1";
    }

    if (!document.body.classList.contains("o-about-container")) {
      const cpanels = document.querySelectorAll(".c-panel");
      cpanels.forEach((item) => (item.style.zIndex = "0"));
    }
  });

  menuClose.on("click", function () {
    timeline.timeScale(1.25);
    timeline.reverse();

    if (
      document.body.classList.contains("o-contact-container") ||
      document.body.classList.contains("o-portfolio-container")
    ) {
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
  const image = el.querySelector("img");

  el.addEventListener("mouseenter", (e) => {
    gsap.to(image, { autoAlpha: 1 });
  });

  el.addEventListener("mouseleave", (e) => {
    gsap.to(image, { autoAlpha: 0 });
  });

  el.addEventListener("mousemove", (e) => {
    gsap.set(image, { x: e.offsetX - 200 });
  });
});

$(".js-contact-input").keyup(function () {
  if ($(this).val()) {
    $(this).addClass("not-empty");
  } else {
    $(this).removeClass("not-empty");
  }
});

if (window.innerWidth <= 768) {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

if (form) {
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
        Accept: "application/json",
      },
      body: json,
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

(function () {
  let text = "TURN • IDEAS • INTO • INTERFACES • ";
  let ring = document.getElementById("ring");
  if (!ring) return; // the homepage hero no longer has the text ring
  let radius = 268;
  let chars = text.split("");
  chars.forEach(function (ch, i) {
    let angle = (360 / chars.length) * i;
    let span = document.createElement("span");
    span.textContent = ch;
    span.setAttribute("aria-hidden", "true");
    span.style.position = "absolute";
    span.style.top = "50%";
    span.style.left = "50%";
    span.style.fontSize = "16px";
    span.style.fontWeight = "500";
    span.style.letterSpacing = "1px";
    span.style.opacity = "0.5";
    span.style.color = "#FFEFD9";
    span.style.transform =
      "translate(-50%, -50%) rotate(" +
      angle +
      "deg) translate(0, -" +
      radius +
      "px)";
    ring.appendChild(span);
  });
})();

console.clear();

// Vertical page signature: fixed on the left edge, fades out at the end of the page, where the footer is
// (the footer's only content is fixed, so it has no height to observe)
const siteCaption = document.querySelector(".js-site-caption");

if (siteCaption) {
  let captionTicking = false;
  const updateSiteCaption = () => {
    captionTicking = false;
    const atEnd =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 120;
    siteCaption.classList.toggle("is-hidden", atEnd);
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!captionTicking) {
        captionTicking = true;
        window.requestAnimationFrame(updateSiteCaption);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", updateSiteCaption);
  updateSiteCaption();
}

// Homepage socials: start bottom-right and travel up with the page (1:1 with the scroll) until they
// reach the middle of the right edge,
// and fade out while the contact section (which has its own social links) is on screen
const homeSocials = document.querySelector(".o-home-container .c-social-icons");

if (homeSocials) {
  const contactSection = document.querySelector(".js-contact");
  let socialsTicking = false;
  const updateHomeSocials = () => {
    socialsTicking = false;
    // distance between the start and docked positions (CSS: 1.5rem below the bottom edge → centred)
    // settles a little below the middle (centre at 62% of the screen height)
    const travel = window.innerHeight * 0.38 + 24 - homeSocials.offsetHeight / 2;
    const dock = travel > 0 ? Math.min(Math.max(window.scrollY / travel, 0), 1) : 1;
    homeSocials.style.setProperty("--dock", dock.toFixed(4));
    if (contactSection) {
      const box = contactSection.getBoundingClientRect();
      homeSocials.classList.toggle(
        "is-hidden",
        box.top < window.innerHeight * 0.6 && box.bottom > window.innerHeight * 0.4
      );
    }
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!socialsTicking) {
        socialsTicking = true;
        window.requestAnimationFrame(updateHomeSocials);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", updateHomeSocials);
  updateHomeSocials();
}

// Intro chat: when the section comes into view, Elly "types" each message in turn (plays once)
const introChat = document.querySelector(".js-intro-chat");
const chatReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (introChat && !chatReduceMotion && "IntersectionObserver" in window) {
  const chatThread = introChat.querySelector(".c-intro-chat__thread");
  const chatStatus = introChat.querySelector(".js-chat-status");
  const chatStatusText = chatStatus ? chatStatus.textContent : "";
  const chatMessages = Array.from(introChat.querySelectorAll(".js-chat-msg"));
  const chatTyping = introChat.querySelector(".js-chat-typing");
  const chatAfter = Array.from(introChat.querySelectorAll(".js-chat-after"));
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Toggle classes with transitions paused, so messages don't animate shut on load
  const withoutTransitions = (change) => {
    introChat.classList.add("is-measuring");
    const result = change();
    void introChat.offsetHeight;
    introChat.classList.remove("is-measuring");
    return result;
  };

  withoutTransitions(() => introChat.classList.add("is-playing"));

  const playIntroChat = async () => {
    // Reserve the finished thread's height (measured with every message shown for an
    // instant, before the browser paints) so the page below doesn't move while it plays
    const fullHeight = withoutTransitions(() => {
      introChat.classList.remove("is-playing");
      const height = chatThread.offsetHeight;
      introChat.classList.add("is-playing");
      return height;
    });
    chatThread.style.minHeight = `${fullHeight}px`;

    // Header says "typing…" for the whole conversation, then goes back to Elly's title
    const setStatus = (typing) => {
      if (!chatStatus) return;
      chatStatus.textContent = typing ? "typing…" : chatStatusText;
      chatStatus.classList.toggle("is-typing", typing);
    };

    setStatus(true);
    for (const msg of chatMessages) {
      chatTyping.classList.add("is-visible");
      // Longer messages "take longer to type"
      await wait(Math.min(600 + msg.textContent.trim().length * 10, 1800));
      chatTyping.classList.remove("is-visible");
      msg.classList.add("is-visible");
      await wait(400);
    }
    // Then "Delivered" and the quick replies
    for (const item of chatAfter) {
      await wait(350);
      item.classList.add("is-visible");
    }
    setStatus(false);
    chatThread.style.minHeight = "";
  };

  const chatObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        chatObserver.disconnect();
        playIntroChat();
      }
    },
    { rootMargin: "0px 0px -30% 0px" }
  );
  chatObserver.observe(chatThread);
}

// Selected work: the picker, arrows and details all switch the project shown in both device screens
const work = document.querySelector(".js-work");

if (work) {
  const picks = Array.from(work.querySelectorAll(".js-work-pick"));
  const shots = work.querySelectorAll(".js-work-shot");
  const screens = work.querySelectorAll(".js-work-screen");
  const field = (selector) => work.querySelector(selector);
  const stack = field(".js-work-stack");
  const chips = field(".js-work-chips");
  let current = 0;

  const showProject = (index, scrollPick = true) => {
    current = (index + picks.length) % picks.length;
    const data = picks[current].dataset;

    picks.forEach((pick, i) => {
      pick.classList.toggle("is-active", i === current);
      pick.setAttribute("aria-pressed", i === current ? "true" : "false");
    });
    field(".js-work-current").textContent = data.num;
    field(".js-work-num").textContent = data.num;
    field(".js-work-name").textContent = data.name;
    field(".js-work-type").textContent = data.type;
    field(".js-work-domain").textContent = data.domain;
    field(".js-work-domain").href = data.url;
    field(".js-work-visit").href = data.url;

    shots.forEach((shot) => {
      const isPhone = shot.classList.contains("js-work-mobile");
      shot.src = isPhone ? data.mobile || data.full : data.full;
      shot.alt = `${data.name} website on ${isPhone ? "mobile" : "desktop"}`;
      // Projects without a mobile capture show a crop of the desktop page in the phone
      if (isPhone) shot.parentElement.classList.toggle("is-desktop-crop", !data.mobile);
    });
    screens.forEach((screen) => (screen.scrollTop = 0));

    // "Built with" shows only once a project has data-stack, e.g. data-stack="HTML, SCSS, JavaScript"
    // (the "Built with" block is commented out in the HTML for now, so this only runs if it's back)
    if (stack && chips) {
      const items = (data.stack || "").split(",").map((item) => item.trim()).filter(Boolean);
      chips.innerHTML = "";
      items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        chips.appendChild(li);
      });
      stack.hidden = items.length === 0;
    }

    if (scrollPick) {
      const list = picks[current].closest(".c-work__picks");
      const card = picks[current].closest("li");
      list.scrollTo({ left: card.offsetLeft - list.clientWidth / 2 + card.offsetWidth / 2, behavior: "smooth" });
    }
  };

  picks.forEach((pick, i) => pick.addEventListener("click", () => showProject(i)));
  field(".js-work-prev").addEventListener("click", () => showProject(current - 1));
  field(".js-work-next").addEventListener("click", () => showProject(current + 1));
  showProject(0, false);

  // Mouse wheel over the thumbnail strip scrolls it sideways
  const pickList = work.querySelector(".c-work__picks");
  pickList.addEventListener(
    "wheel",
    (e) => {
      const max = pickList.scrollWidth - pickList.clientWidth;
      if (max <= 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const atStart = pickList.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = pickList.scrollLeft >= max - 1 && e.deltaY > 0;
      if (atStart || atEnd) return; // let the page carry on scrolling at either end
      e.preventDefault();
      pickList.scrollLeft += e.deltaY;
    },
    { passive: false }
  );

  // Prev / next sit under "Visit live site", lined up with the bottom of the monitor
  const workNav = field(".js-work-nav");
  const monitor = work.querySelector(".c-work__desktop-frame");
  const alignNav = () => {
    if (!workNav || !monitor) return;
    workNav.style.marginTop = "";
    if (window.innerWidth < 992) return;
    const gap = monitor.getBoundingClientRect().bottom - workNav.getBoundingClientRect().bottom;
    if (gap > 0) workNav.style.marginTop = `${gap}px`;
  };
  window.addEventListener("resize", alignNav);
  window.addEventListener("load", alignNav);
  alignNav();

  // Strip: edge fades follow the scroll position; mouse drag scrolls it
  const updateStrip = () => {
    const max = pickList.scrollWidth - pickList.clientWidth;
    pickList.style.setProperty("--fade-left", pickList.scrollLeft > 4 ? "64px" : "0px");
    pickList.style.setProperty("--fade-right", pickList.scrollLeft < max - 4 ? "64px" : "0px");
  };
  pickList.addEventListener("scroll", updateStrip, { passive: true });
  window.addEventListener("resize", updateStrip);
  updateStrip();

  let drag = null;
  pickList.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return; // touch already scrolls natively
    drag = { x: e.clientX, left: pickList.scrollLeft, moved: false };
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 5) {
      drag.moved = true;
      pickList.classList.add("is-dragging");
    }
    if (drag.moved) pickList.scrollLeft = drag.left - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!drag) return;
    const wasDrag = drag.moved;
    drag = null;
    // keep the "no click" state for this frame so a drag never selects a project
    requestAnimationFrame(() => pickList.classList.remove("is-dragging"));
    if (!wasDrag) pickList.classList.remove("is-dragging");
  });

  // "Scroll inside the screens" tip: shows each time the device area comes into view
  // (on every page load, and again after scrolling away and back)
  const tip = work.querySelector(".js-work-tip");

  if (tip && "IntersectionObserver" in window) {
    let tipTimer;
    let armed = true;
    const hideTip = () => {
      clearTimeout(tipTimer);
      if (!tip.classList.contains("is-visible")) return;
      tip.classList.remove("is-visible");
      setTimeout(() => {
        if (!tip.classList.contains("is-visible")) tip.hidden = true;
      }, 500);
    };
    const showTip = () => {
      clearTimeout(tipTimer);
      tip.hidden = false;
      void tip.offsetWidth; // apply the hidden state first so the fade-in plays
      tip.classList.add("is-visible");
      tipTimer = setTimeout(hideTip, 9000);
    };
    const tipObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.45 && armed) {
            armed = false;
            showTip();
          } else if (!entry.isIntersecting) {
            armed = true; // left the screen completely: show again next time
            hideTip();
          }
        });
      },
      { threshold: [0, 0.45] }
    );
    tipObserver.observe(work.querySelector(".c-work__devices"));
    work.querySelector(".js-work-tip-close").addEventListener("click", hideTip);
    screens.forEach((screen) => screen.addEventListener("scroll", hideTip, { passive: true }));
  }
}

// Contact form on the homepage: sends through Web3Forms, like the contact page
const contactForm = document.querySelector(".js-contact-form");

if (contactForm) {
  const contactResult = contactForm.querySelector(".js-contact-result");
  const sendButton = contactForm.querySelector(".js-contact-send");
  const sendLabel = contactForm.querySelector(".js-contact-send-label");
  const setResult = (text, state) => {
    contactResult.textContent = text;
    contactResult.classList.toggle("is-success", state === "success");
    contactResult.classList.toggle("is-error", state === "error");
  };

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fields = Array.from(contactForm.querySelectorAll("input[required], textarea[required]"));
    let firstInvalid = null;
    fields.forEach((field) => {
      const ok = field.checkValidity();
      field.closest(".c-contact__field").classList.toggle("is-invalid", !ok);
      if (!ok && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      setResult("Please fill in every field (with a valid email).", "error");
      firstInvalid.focus();
      return;
    }

    sendButton.disabled = true;
    sendLabel.textContent = "Sending…";
    setResult("", null);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
      });
      const json = await response.json();
      if (response.ok && json.success !== false) {
        setResult("Thank you! Your message is on its way. I’ll get back to you soon.", "success");
        contactForm.reset();
      } else {
        setResult(json.message || "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      setResult("Something went wrong. Please check your connection and try again.", "error");
    } finally {
      sendButton.disabled = false;
      sendLabel.textContent = "Send";
    }
  });

  // "Say hello" opens the short form in a dialog
  const contactDialog = document.querySelector(".js-contact-dialog");
  const openButton = document.querySelector(".js-contact-open");
  if (contactDialog && openButton) {
    openButton.addEventListener("click", () => {
      if (typeof contactDialog.showModal === "function") contactDialog.showModal();
      else contactDialog.setAttribute("open", "");
      contactForm.querySelector("input:not([type=hidden])")?.focus();
    });
    document.querySelector(".js-contact-close").addEventListener("click", () => contactDialog.close());
    // click on the dimmed backdrop closes it
    contactDialog.addEventListener("click", (e) => {
      if (e.target === contactDialog) contactDialog.close();
    });
    contactDialog.addEventListener("close", () => openButton.focus());
  }

  contactForm.querySelectorAll("input, textarea").forEach((field) =>
    field.addEventListener("input", () => field.closest(".c-contact__field")?.classList.remove("is-invalid"))
  );
}

// Skills: cards stack as you scroll; the counter, progress bar and menu follow the card on top
const skillsDeck = document.querySelector(".c-skills__deck");
const skillCards = Array.from(document.querySelectorAll(".js-skills-card"));
const skillLinks = Array.from(document.querySelectorAll(".js-skills-link"));
const skillsCurrent = document.querySelector(".js-skills-current");
const skillsProgress = document.querySelector(".js-skills-progress");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (skillsDeck && skillCards.length) {
  let arrivals = []; // scroll position at which each card reaches its sticky spot
  let activeSkill = -1;
  let ticking = false;

  const measureSkills = () => {
    const deckTop = skillsDeck.getBoundingClientRect().top + window.scrollY;
    const gap = parseFloat(getComputedStyle(skillsDeck).rowGap) || 0;
    let offset = 0;
    arrivals = skillCards.map((card) => {
      const style = getComputedStyle(card);
      const stickyTop = style.position === "sticky" ? parseFloat(style.top) : 96;
      const arrival = deckTop + offset - stickyTop;
      offset += card.offsetHeight + gap;
      return arrival;
    });
  };

  const setActiveSkill = (index) => {
    if (index === activeSkill) return;
    activeSkill = index;
    skillLinks.forEach((link, i) => {
      link.classList.toggle("is-active", i === index);
      if (i === index) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    if (skillsCurrent) skillsCurrent.textContent = String(index + 1).padStart(2, "0");
    if (skillsProgress)
      skillsProgress.style.transform = `scaleX(${(index + 1) / skillCards.length})`;
  };

  const updateSkills = () => {
    ticking = false;
    const y = window.scrollY;
    const threshold = window.innerHeight * 0.35;
    let index = 0;
    arrivals.forEach((arrival, i) => {
      if (y + threshold >= arrival) index = i;
    });
    setActiveSkill(index);

    // Push cards back as later cards slide over them (desktop stack only)
    const stacked = getComputedStyle(skillCards[0]).position === "sticky";
    skillCards.forEach((card, i) => {
      const shade = card.querySelector(".js-skills-shade");
      if (!stacked || reduceMotion.matches || i === skillCards.length - 1) {
        card.style.transform = "";
        if (shade) shade.style.opacity = 0;
        return;
      }
      const segment = arrivals[i + 1] - arrivals[i] || 1;
      const depth = Math.min(Math.max((y - arrivals[i]) / segment, 0), 3);
      card.style.transform = `scale(${1 - depth * 0.035})`;
      if (shade) shade.style.opacity = (depth / 3) * 0.35;
    });
  };

  const requestSkillsUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateSkills);
    }
  };

  const refreshSkills = () => {
    measureSkills();
    updateSkills();
  };

  // Menu: jump to the moment a card lands on the stack
  skillLinks.forEach((link, i) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      measureSkills();
      window.scrollTo({
        top: Math.ceil(arrivals[i]) + 1,
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
      skillCards[i].focus({ preventScroll: true });
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });

  refreshSkills();
  window.addEventListener("scroll", requestSkillsUpdate, { passive: true });
  window.addEventListener("resize", refreshSkills);
  window.addEventListener("load", refreshSkills);
  document.fonts?.ready.then(refreshSkills);
}

// Site menu: vertical picker wheel. Scroll, swipe, arrow keys or a click turn it; the middle
// word (or the button beside it) goes to that page. Escape, Close and links close it.
const wheelMenu = document.querySelector(".js-wheel-menu");
const wheelOpeners = [...document.querySelectorAll(".js-wheel-open")];
let wheelOpen = wheelOpeners[0];

if (wheelMenu && wheelOpen) {
  const wheelItems = [...wheelMenu.querySelectorAll(".js-wheel-item")];
  const wheelArea = wheelMenu.querySelector(".js-wheel");
  const wheelPane = wheelMenu.querySelector(".js-wheel-pane");
  const wheelKicker = wheelMenu.querySelector(".js-wheel-kicker");
  const wheelText = wheelMenu.querySelector(".js-wheel-text");
  const wheelCta = wheelMenu.querySelector(".js-wheel-cta");
  const wheelCtaLabel = wheelMenu.querySelector(".js-wheel-cta-label");
  const wheelClose = wheelMenu.querySelector(".js-wheel-close");
  const wheelCount = wheelMenu.querySelector(".js-wheel-count");
  let wheelIndex = 0;
  let wheelLock = 0;
  let wheelTimer = null;
  let wheelScrollY = 0;

  const gap = () => parseFloat(getComputedStyle(wheelMenu).getPropertyValue("--wheel-gap")) || 150;

  const setWheel = (index, animatePane = true) => {
    wheelIndex = Math.max(0, Math.min(wheelItems.length - 1, index));
    const step = gap();
    wheelItems.forEach((item, i) => {
      const off = i - wheelIndex;
      const far = Math.abs(off);
      item.style.transform = `translateY(${off * step}px) scale(${far === 0 ? 1 : 0.6})`;
      item.style.opacity = far === 0 ? 1 : far === 1 ? 0.75 : far === 2 ? 0.55 : 0.4;
      item.classList.toggle("is-current", far === 0);
      item.setAttribute("aria-current", far === 0 ? "true" : "false");
      item.tabIndex = far === 0 ? 0 : -1;
    });
    const item = wheelItems[wheelIndex];
    if (wheelCount) wheelCount.textContent = String(wheelIndex + 1).padStart(2, "0");
    wheelKicker.textContent = item.dataset.kicker;
    wheelText.textContent = item.dataset.text;
    wheelCtaLabel.textContent = item.dataset.cta;
    wheelCta.href = item.getAttribute("href");
    if (animatePane) {
      wheelPane.classList.remove("is-changing");
      void wheelPane.offsetWidth;
      wheelPane.classList.add("is-changing");
    }
  };

  const openWheel = () => {
    clearTimeout(wheelTimer);
    wheelScrollY = window.scrollY;
    wheelMenu.hidden = false;
    document.documentElement.classList.add("is-menu-open");
    wheelOpeners.forEach((btn) => btn.setAttribute("aria-expanded", "true"));
    setWheel(wheelIndex, false);
    void wheelMenu.offsetWidth;
    wheelMenu.classList.add("is-open");
    wheelItems[wheelIndex].focus({ preventScroll: true });
  };

  const closeWheel = (returnFocus = true) => {
    wheelMenu.classList.remove("is-open");
    document.documentElement.classList.remove("is-menu-open");
    // locking the page scroll can reset it, so put the visitor back where they were
    window.scrollTo({ top: wheelScrollY, behavior: "instant" });
    wheelOpeners.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    wheelTimer = setTimeout(() => {
      wheelMenu.hidden = true;
    }, 750);
    if (returnFocus) wheelOpen.focus({ preventScroll: true });
  };

  // Same-page links (Home, #contact) close the menu and scroll; other pages just navigate
  const go = (href, event) => {
    if (href === "/" || href.startsWith("#")) {
      event.preventDefault();
      closeWheel(false);
      const target = href === "/" ? null : document.querySelector(href);
      setTimeout(() => {
        if (target) target.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }, 350);
    }
  };

  wheelItems.forEach((item, i) => {
    item.addEventListener("click", (event) => {
      if (i !== wheelIndex) {
        event.preventDefault();
        setWheel(i);
        return;
      }
      go(item.getAttribute("href"), event);
    });
  });

  wheelCta.addEventListener("click", (event) => go(wheelCta.getAttribute("href"), event));
  wheelOpeners.forEach((btn) =>
    btn.addEventListener("click", () => {
      wheelOpen = btn;
      openWheel();
    })
  );
  wheelClose.addEventListener("click", () => closeWheel());

  wheelArea.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const now = Date.now();
      if (Math.abs(event.deltaY) < 4 || now - wheelLock < 380) return;
      wheelLock = now;
      setWheel(wheelIndex + (event.deltaY > 0 ? 1 : -1));
    },
    { passive: false }
  );

  // Mouse drag: pull the wheel up or down; every 60px of drag turns it one step
  let dragY = null;
  let dragged = false;
  wheelItems.forEach((item) => item.setAttribute("draggable", "false"));
  wheelArea.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    dragY = event.clientY;
    dragged = false;
  });
  window.addEventListener("pointermove", (event) => {
    if (dragY === null) return;
    const dy = dragY - event.clientY;
    if (Math.abs(dy) > 8) {
      wheelArea.classList.add("is-dragging");
    }
    if (Math.abs(dy) >= 60) {
      setWheel(wheelIndex + (dy > 0 ? 1 : -1));
      dragY = event.clientY;
      dragged = true;
    }
  });
  window.addEventListener("pointerup", () => {
    if (dragY === null) return;
    dragY = null;
    wheelArea.classList.remove("is-dragging");
  });
  // a drag shouldn't also count as a click on the word under the pointer
  wheelArea.addEventListener(
    "click",
    (event) => {
      if (dragged) {
        event.preventDefault();
        event.stopImmediatePropagation();
        dragged = false;
      }
    },
    true
  );

  let touchY = null;
  wheelArea.addEventListener("touchstart", (event) => { touchY = event.touches[0].clientY; }, { passive: true });
  wheelArea.addEventListener("touchend", (event) => {
    if (touchY === null) return;
    const dy = touchY - event.changedTouches[0].clientY;
    if (Math.abs(dy) > 30) setWheel(wheelIndex + (dy > 0 ? 1 : -1));
    touchY = null;
  });

  wheelMenu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeWheel();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setWheel(wheelIndex + (event.key === "ArrowDown" ? 1 : -1));
      wheelItems[wheelIndex].focus({ preventScroll: true });
    } else if (event.key === "Tab") {
      // keep focus inside the open menu
      const focusables = [...wheelMenu.querySelectorAll("a[href], button")].filter((el) => el.tabIndex !== -1);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  window.addEventListener("resize", () => { if (!wheelMenu.hidden) setWheel(wheelIndex, false); });
  setWheel(0, false);
}

// While scrolling: past the hero, the logo and the menu fade in at the top corners
const capsule = document.querySelector(".js-capsule");

if (capsule) {
  const capsuleHero = document.querySelector(".js-hero");
  let capsuleTicking = false;

  const updateCapsule = () => {
    capsuleTicking = false;
    const show = window.scrollY > (capsuleHero ? capsuleHero.offsetHeight * 0.25 : 200);
    capsule.classList.toggle("is-visible", show);
    capsule.inert = !show;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!capsuleTicking) {
        capsuleTicking = true;
        window.requestAnimationFrame(updateCapsule);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", updateCapsule);
  updateCapsule();
}

// Contact button: the verb keeps changing (create, build, design, talk)
const helloWords = document.querySelector(".js-hello-words");
const helloVerb = document.querySelector(".js-hello-verb");

if (helloWords && helloVerb) {
  const verbs = ["create", "build", "design", "talk"];
  let verbIndex = 0;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)");
  setInterval(() => {
    if (document.hidden) return;
    verbIndex = (verbIndex + 1) % verbs.length;
    if (still.matches) {
      helloVerb.textContent = verbs[verbIndex];
      return;
    }
    helloWords.classList.add("is-swapping");
    setTimeout(() => {
      helloVerb.textContent = verbs[verbIndex];
      helloWords.classList.remove("is-swapping");
    }, 300);
  }, 2400);
}
