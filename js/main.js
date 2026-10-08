"use strict";

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