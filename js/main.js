"use strict";

const header = document.querySelector("header");

if (header) {
  const scrollThreshold = 30;
  let isScrolled = header.classList.contains("header--scrolled");

  const updateHeader = () => {
    const scrolled = window.scrollY >= scrollThreshold;
    if (scrolled === isScrolled) return;

    isScrolled = scrolled;
    header.classList.toggle("header--scrolled", scrolled);
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("pageshow", updateHeader);
  updateHeader();
}

const backToTop = document.querySelector(".back-to-top");
const footer = document.querySelector(".footer");

if (backToTop && footer) {
  const activationThreshold = 0.8;
  const footerObserver = new IntersectionObserver(([entry]) => {
    const visible = entry.isIntersecting &&
      entry.intersectionRatio >= activationThreshold;

    if (!visible && document.activeElement === backToTop) {
      backToTop.blur();
    }

    backToTop.inert = !visible;
    backToTop.tabIndex = visible ? 0 : -1;
    backToTop.setAttribute("aria-hidden", String(!visible));
    backToTop.classList.toggle("back-to-top--visible", visible);
  }, { threshold: activationThreshold });

  footerObserver.observe(footer);
}