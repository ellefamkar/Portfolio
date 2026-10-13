// The page starts hidden (body { visibility: hidden }) so nothing flashes before the styles load
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.visibility = "visible";

  // Images settle in with a slight zoom
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("img").forEach((img) => {
      img.animate([{ transform: "scale(0.9)" }, { transform: "none" }], {
        duration: 850,
        easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      });
    });
  }
});

// Tab title waves goodbye while the visitor is on another tab
const documentTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come back soon ✨";
});
window.addEventListener("focus", () => {
  document.title = documentTitle;
});

/* Commented out for now, until deciding whether to keep it
// Goodbye card: on desktop, when the pointer leaves through the top of the window (towards the tabs
// or the close button), say thanks. Never blocks leaving. Once they close it (Close or Escape) it stays
// gone for the rest of the session, even after a reload, so heading back up to close the tab doesn't
// bring it back. Only scrolling through a good part of the page again (about two screens) re-arms it.
const goodbye = document.querySelector(".js-goodbye");

if (goodbye && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let goodbyeArmed = false;
  const goodbyeDismissedKey = "ef-goodbye-dismissed";
  let goodbyeDismissed = false;
  try {
    goodbyeDismissed = sessionStorage.getItem(goodbyeDismissedKey) === "1";
  } catch (e) {}

  const setGoodbyeDismissed = (dismissed) => {
    goodbyeDismissed = dismissed;
    try {
      if (dismissed) sessionStorage.setItem(goodbyeDismissedKey, "1");
      else sessionStorage.removeItem(goodbyeDismissedKey);
    } catch (e) {}
  };
  let goodbyeHideTimer;
  let scrolledSinceDismiss = 0;
  // null until the first scroll, so the browser restoring the position on reload isn't counted
  let lastScrollY = null;

  // give the visitor a moment on the page first
  setTimeout(() => (goodbyeArmed = true), 4000);

  const onGoodbyeKey = (event) => {
    if (event.key === "Escape") hideGoodbye();
  };

  const hideGoodbye = () => {
    setGoodbyeDismissed(true);
    scrolledSinceDismiss = 0;
    goodbye.classList.remove("is-visible");
    document.removeEventListener("keydown", onGoodbyeKey);
    goodbyeHideTimer = setTimeout(() => (goodbye.hidden = true), 400);
  };

  const showGoodbye = () => {
    clearTimeout(goodbyeHideTimer);
    goodbye.hidden = false;
    void goodbye.offsetWidth;
    goodbye.classList.add("is-visible");
    document.addEventListener("keydown", onGoodbyeKey);
  };

  // count scrolling in either direction after a dismissal; enough of it re-arms the card
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (goodbyeDismissed && lastScrollY !== null) {
        scrolledSinceDismiss += Math.abs(y - lastScrollY);
        if (scrolledSinceDismiss > window.innerHeight * 2) setGoodbyeDismissed(false);
      }
      lastScrollY = y;
    },
    { passive: true },
  );

  // Only a real exit counts: the pointer leaves the window through the top edge (not the sides or
  // bottom) and stays out for a moment, so brushing the top while reaching for the header doesn't
  let goodbyeExitTimer;

  document.addEventListener("mouseout", (event) => {
    if (
      goodbyeArmed &&
      !goodbyeDismissed &&
      !goodbye.classList.contains("is-visible") &&
      !event.relatedTarget &&
      event.clientY <= 0
    ) {
      goodbyeExitTimer = setTimeout(showGoodbye, 250);
    }
  });

  // back on the page before the moment passed: they weren't leaving
  document.addEventListener("mouseover", () => clearTimeout(goodbyeExitTimer));

  goodbye
    .querySelectorAll(".js-goodbye-close")
    .forEach((el) => el.addEventListener("click", hideGoodbye));
}
*/

// Vertical page signature: fixed on the left edge, fades out at the end of the page, where the footer is
// (the footer's only content is fixed, so it has no height to observe)
const siteCaption = document.querySelector(".js-site-caption");

if (siteCaption) {
  let captionTicking = false;
  const updateSiteCaption = () => {
    captionTicking = false;
    const atEnd =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 120;
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
    { passive: true },
  );
  window.addEventListener("resize", updateSiteCaption);
  updateSiteCaption();
}

// Homepage socials: start bottom-right and travel up with the page (1:1 with the scroll) until they
// settle a little below the middle of the right edge (--dock-at in the CSS),
// and fade out while the contact section (which has its own social links) is on screen
const homeSocials = document.querySelector(".o-home-container .c-social-icons");

if (homeSocials) {
  const contactSection = document.querySelector(".js-contact");
  let socialsTicking = false;
  const updateHomeSocials = () => {
    socialsTicking = false;
    // distance between the start and docked positions (CSS: 1.5rem below the bottom edge → its
    // centre at --dock-at down the screen)
    const dockAt =
      parseFloat(getComputedStyle(homeSocials).getPropertyValue("--dock-at")) /
        100 || 0.5;
    const travel =
      window.innerHeight * (1 - dockAt) + 24 - homeSocials.offsetHeight / 2;
    const dock =
      travel > 0 ? Math.min(Math.max(window.scrollY / travel, 0), 1) : 1;
    homeSocials.style.setProperty("--dock", dock.toFixed(4));
    if (contactSection) {
      const box = contactSection.getBoundingClientRect();
      homeSocials.classList.toggle(
        "is-hidden",
        box.top < window.innerHeight * 0.6 &&
          box.bottom > window.innerHeight * 0.4,
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
    { passive: true },
  );
  window.addEventListener("resize", updateHomeSocials);
  updateHomeSocials();
}

// Intro chat: when the section comes into view, Elly "types" each message in turn (plays once)
const introChat = document.querySelector(".js-intro-chat");
const chatReduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

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

  // The thread starts empty and grows as each message arrives, pushing the page below down
  const playIntroChat = async () => {
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
  };

  const chatObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        chatObserver.disconnect();
        playIntroChat();
      }
    },
    { rootMargin: "0px 0px -30% 0px" },
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
    // any of these can be commented out in the HTML, so set only the ones present
    const setText = (selector, text) => {
      const el = field(selector);
      if (el) el.textContent = text;
    };
    setText(".js-work-current", data.num);
    setText(".js-work-navnum", data.num);
    setText(".js-work-bignum", data.num);
    setText(".js-work-desc", data.desc || "");
    const progress = field(".js-work-progress");
    if (progress)
      progress.style.width = `${((current + 1) / picks.length) * 100}%`;
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
      if (isPhone)
        shot.parentElement.classList.toggle("is-desktop-crop", !data.mobile);
    });
    screens.forEach((screen) => (screen.scrollTop = 0));

    // "Built with" shows only once a project has data-stack, e.g. data-stack="HTML, SCSS, JavaScript"
    // (the "Built with" block is commented out in the HTML for now, so this only runs if it's back)
    if (stack && chips) {
      const items = (data.stack || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
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
      list.scrollTo({
        left: card.offsetLeft - list.clientWidth / 2 + card.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  };

  picks.forEach((pick, i) =>
    pick.addEventListener("click", () => showProject(i)),
  );
  field(".js-work-prev").addEventListener("click", () =>
    showProject(current - 1),
  );
  field(".js-work-next").addEventListener("click", () =>
    showProject(current + 1),
  );
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
    { passive: false },
  );

  // Phones: Desktop / Mobile switch above the preview (only one screen is shown there)
  const devices = field(".js-work-devices");
  const viewButtons = work.querySelectorAll(".js-work-view");
  viewButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      const mobile = btn.dataset.view === "mobile";
      devices.classList.toggle("is-mobile-view", mobile);
      viewButtons.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      screens.forEach((screen) => (screen.scrollTop = 0));
    }),
  );

  // Prev / next + counter: centred under the screens on desktop, under the details card on phones
  // (one set of buttons, moved, not duplicated)
  const workNav = field(".js-work-nav");
  const workInfo = field(".c-work__info");
  const navDesktop = window.matchMedia("(min-width: 768px)");
  const placeNav = () => {
    if (!workNav || !devices || !workInfo) return;
    if (navDesktop.matches) {
      if (workNav.parentElement !== devices) devices.appendChild(workNav);
    } else if (workNav.previousElementSibling !== workInfo) {
      // phones: right under the details card
      workInfo.after(workNav);
    }
  };
  navDesktop.addEventListener("change", placeNav);
  placeNav();

  // Strip: edge fades follow the scroll position; mouse drag scrolls it
  const updateStrip = () => {
    const max = pickList.scrollWidth - pickList.clientWidth;
    pickList.style.setProperty(
      "--fade-left",
      pickList.scrollLeft > 4 ? "64px" : "0px",
    );
    pickList.style.setProperty(
      "--fade-right",
      pickList.scrollLeft < max - 4 ? "64px" : "0px",
    );
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
      { threshold: [0, 0.45] },
    );
    tipObserver.observe(work.querySelector(".c-work__devices"));
    work.querySelector(".js-work-tip-close").addEventListener("click", hideTip);
    screens.forEach((screen) =>
      screen.addEventListener("scroll", hideTip, { passive: true }),
    );
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
    const fields = Array.from(
      contactForm.querySelectorAll("input[required], textarea[required]"),
    );
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
      });
      const json = await response.json();
      if (response.ok && json.success !== false) {
        setResult(
          "Thank you! Your message is on its way. I’ll get back to you soon.",
          "success",
        );
        contactForm.reset();
      } else {
        setResult(
          json.message || "Something went wrong. Please try again.",
          "error",
        );
      }
    } catch (error) {
      setResult(
        "Something went wrong. Please check your connection and try again.",
        "error",
      );
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
      if (typeof contactDialog.showModal === "function")
        contactDialog.showModal();
      else contactDialog.setAttribute("open", "");
      contactForm.querySelector("input:not([type=hidden])")?.focus();
    });
    document
      .querySelector(".js-contact-close")
      .addEventListener("click", () => contactDialog.close());
    // click on the dimmed backdrop closes it
    contactDialog.addEventListener("click", (e) => {
      if (e.target === contactDialog) contactDialog.close();
    });
    contactDialog.addEventListener("close", () => openButton.focus());
  }

  contactForm
    .querySelectorAll("input, textarea")
    .forEach((field) =>
      field.addEventListener("input", () =>
        field.closest(".c-contact__field")?.classList.remove("is-invalid"),
      ),
    );
}

// Skills: cards stack as you scroll; the counter, progress bar and menu follow the card on top
const skillsDeck = document.querySelector(".c-skills__deck");
const skillCards = Array.from(document.querySelectorAll(".js-skills-card"));
const skillLinks = Array.from(document.querySelectorAll(".js-skills-link"));
const skillsCurrent = document.querySelector(".js-skills-current");
const skillsProgress = document.querySelector(".js-skills-progress");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Stacked cards share one height. Make it at least as tall as the fullest card, so none of them
// ever needs its own scrollbar (tablets and desktop; phones show the cards at their natural height)
const fitSkillCards = () => {
  const section = document.querySelector(".c-skills");
  if (!section || !skillCards.length) return;
  section.style.removeProperty("--card-h-fit");
  if (window.innerWidth < 992) return;
  let tallest = 0;
  skillCards.forEach((card) => {
    const before = card.style.height;
    card.style.height = "auto";
    tallest = Math.max(tallest, card.scrollHeight);
    card.style.height = before;
  });
  section.style.setProperty("--card-h-fit", `${Math.ceil(tallest)}px`);
};
fitSkillCards();
window.addEventListener("resize", fitSkillCards);
window.addEventListener("load", fitSkillCards);
if (document.fonts && document.fonts.ready)
  document.fonts.ready.then(fitSkillCards);

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
      const stickyTop =
        style.position === "sticky" ? parseFloat(style.top) : 96;
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
    if (skillsCurrent)
      skillsCurrent.textContent = String(index + 1).padStart(2, "0");
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

  const gap = () =>
    parseFloat(getComputedStyle(wheelMenu).getPropertyValue("--wheel-gap")) ||
    150;

  const setWheel = (index, animatePane = true) => {
    wheelIndex = Math.max(0, Math.min(wheelItems.length - 1, index));
    const step = gap();
    wheelItems.forEach((item, i) => {
      const off = i - wheelIndex;
      const far = Math.abs(off);
      item.style.transform = `translateY(${off * step}px) scale(${far === 0 ? 1 : 0.6})`;
      item.style.opacity =
        far === 0 ? 1 : far === 1 ? 0.85 : far === 2 ? 0.7 : 0.55;
      item.classList.toggle("is-current", far === 0);
      item.setAttribute("aria-current", far === 0 ? "true" : "false");
      item.tabIndex = far === 0 ? 0 : -1;
    });
    const item = wheelItems[wheelIndex];
    if (wheelCount)
      wheelCount.textContent = String(wheelIndex + 1).padStart(2, "0");
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

  wheelCta.addEventListener("click", (event) =>
    go(wheelCta.getAttribute("href"), event),
  );
  wheelOpeners.forEach((btn) =>
    btn.addEventListener("click", () => {
      wheelOpen = btn;
      openWheel();
    }),
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
    { passive: false },
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
    true,
  );

  let touchY = null;
  wheelArea.addEventListener(
    "touchstart",
    (event) => {
      touchY = event.touches[0].clientY;
    },
    { passive: true },
  );
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
      const focusables = [
        ...wheelMenu.querySelectorAll("a[href], button"),
      ].filter((el) => el.tabIndex !== -1);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (!wheelMenu.hidden) setWheel(wheelIndex, false);
  });
  setWheel(0, false);
}

// While scrolling: past the hero, the logo and the menu fade in at the top corners
const capsule = document.querySelector(".js-capsule");

if (capsule) {
  const capsuleHero = document.querySelector(".js-hero");
  let capsuleTicking = false;

  const updateCapsule = () => {
    capsuleTicking = false;
    const show =
      window.scrollY > (capsuleHero ? capsuleHero.offsetHeight * 0.25 : 200);
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
    { passive: true },
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

// Back to top: shows once the visitor is well past the hero (about 1.5 screens down)
const toTop = document.querySelector(".js-to-top");

if (toTop) {
  const toTopProgress = toTop.querySelector(".js-to-top-progress");
  let toTopTicking = false;
  const updateToTop = () => {
    toTopTicking = false;
    const show = window.scrollY > window.innerHeight * 1.5;
    toTop.classList.toggle("is-visible", show);
    toTop.tabIndex = show ? 0 : -1;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const done = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    toTopProgress.style.strokeDashoffset = String(100 - done);
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!toTopTicking) {
        toTopTicking = true;
        window.requestAnimationFrame(updateToTop);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", updateToTop);
  updateToTop();
}

// Footer sign-off: write the signature in when it scrolls into view; tap the signature to replay
const signoff = document.querySelector(".js-signoff");
const signoffReduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (signoff && !signoffReduceMotion && "IntersectionObserver" in window) {
  const playSignoff = () => {
    signoff.classList.remove("is-playing");
    void signoff.offsetWidth; // restart the CSS animations
    signoff.classList.add("is-playing");
  };

  const signoffObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        playSignoff();
        signoffObserver.disconnect();
      }
    },
    { threshold: 0.4 },
  );
  signoffObserver.observe(signoff);

  const signoffSignature = signoff.querySelector(".js-signoff-signature");
  if (signoffSignature) signoffSignature.addEventListener("click", playSignoff);
}

// Day / night: the theme button opens a full-screen divider. Everything right of the handle
// previews night (a live inverted view of the page); letting go snaps to the side that covers
// more of the screen and saves the choice.
const themeSlider = document.querySelector(".js-theme-slider");

if (themeSlider) {
  const root = document.documentElement;
  const knob = themeSlider.querySelector(".js-theme-knob");
  const themeReduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let cut = 100; // % from the left where night begins: 100 = all day, 0 = all night
  let wasDark = false;
  let opener = null;
  let dragging = false;
  let anim = 0;

  const setCut = (value) => {
    cut = Math.min(100, Math.max(0, value));
    themeSlider.style.setProperty("--cut", `${cut}%`);
    const night = Math.round(100 - cut);
    knob.setAttribute("aria-valuenow", String(night));
    knob.setAttribute("aria-valuetext", night >= 50 ? "Night" : "Day");
  };

  const animateCut = (to, done) => {
    cancelAnimationFrame(anim);
    if (themeReduceMotion) {
      setCut(to);
      if (done) done();
      return;
    }
    const from = cut;
    const start = performance.now();
    const duration = 420;
    const step = (now) => {
      const k = Math.min(1, (now - start) / duration);
      setCut(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) anim = requestAnimationFrame(step);
      else if (done) done();
    };
    anim = requestAnimationFrame(step);
  };

  const close = (dark) => {
    animateCut(dark ? 0 : 100, () => {
      root.classList.toggle("is-dark", dark);
      try {
        localStorage.setItem("ef-theme", dark ? "dark" : "light");
      } catch (e) {}
      themeSlider.hidden = true;
      document.removeEventListener("keydown", onKey);
      if (opener) opener.focus();
    });
  };

  const open = (button) => {
    opener = button;
    wasDark = root.classList.contains("is-dark");
    // While choosing, night is shown by the divider instead of the page filter
    root.classList.remove("is-dark");
    setCut(wasDark ? 0 : 100);
    themeSlider.hidden = false;
    document.addEventListener("keydown", onKey);
    knob.focus();
    // Peek a little way across so the effect is obvious straight away
    animateCut(wasDark ? 38 : 62);
  };

  function onKey(e) {
    if (e.key === "Escape") close(wasDark);
    else if (e.key === "ArrowLeft") setCut(cut - 5);
    else if (e.key === "ArrowRight") setCut(cut + 5);
    else if (e.key === "Home") setCut(0);
    else if (e.key === "End") setCut(100);
    else if (e.key === "Enter" && document.activeElement === knob)
      close(cut < 50);
    else return;
    e.preventDefault();
  }

  const fromPointer = (e) => setCut((e.clientX / window.innerWidth) * 100);

  themeSlider.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".js-theme-cancel")) return;
    cancelAnimationFrame(anim);
    dragging = true;
    themeSlider.classList.add("is-dragging");
    themeSlider.setPointerCapture(e.pointerId);
    fromPointer(e);
  });

  themeSlider.addEventListener("pointermove", (e) => {
    if (dragging) fromPointer(e);
  });

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    themeSlider.classList.remove("is-dragging");
    close(cut < 50);
  };
  themeSlider.addEventListener("pointerup", endDrag);
  themeSlider.addEventListener("pointercancel", endDrag);

  themeSlider
    .querySelector(".js-theme-cancel")
    .addEventListener("click", () => close(wasDark));

  // Phones: dragging across the screen is awkward, so one tap simply flips the theme
  const themeTapOnly = window.matchMedia("(max-width: 767.9px)");
  const themeButtons = document.querySelectorAll(".js-theme-open");

  const labelThemeButtons = () => {
    const dark = root.classList.contains("is-dark");
    themeButtons.forEach((button) => {
      button.setAttribute(
        "aria-label",
        themeTapOnly.matches
          ? `Switch to ${dark ? "day" : "night"}`
          : "Switch between day and night",
      );
      if (themeTapOnly.matches) button.removeAttribute("aria-haspopup");
      else button.setAttribute("aria-haspopup", "dialog");
    });
  };

  const flipTheme = () => {
    const dark = !root.classList.contains("is-dark");
    if (!themeReduceMotion) {
      root.classList.add("is-theme-fading");
      setTimeout(() => root.classList.remove("is-theme-fading"), 500);
    }
    root.classList.toggle("is-dark", dark);
    try {
      localStorage.setItem("ef-theme", dark ? "dark" : "light");
    } catch (e) {}
    labelThemeButtons();
  };

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // tug the lamp's cord
      button.classList.remove("is-pulled");
      void button.offsetWidth;
      button.classList.add("is-pulled");

      if (themeTapOnly.matches) flipTheme();
      else open(button);
    });
  });

  themeTapOnly.addEventListener("change", labelThemeButtons);
  labelThemeButtons();
}
