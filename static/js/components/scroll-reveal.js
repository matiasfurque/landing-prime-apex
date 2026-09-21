(function registerScrollReveal(window, document) {
  "use strict";

  const namespace = (window.PrimeLanding = window.PrimeLanding || {});
  const observed = new WeakSet();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const selectors = [
    ".benefits-section .section-heading",
    ".prime-benefit-carousel",
    ".offers-section .section-heading",
    ".prime-carousel",
    ".monthly-heading",
    ".monthly-card",
    ".alliances-heading",
    ".alliance-card",
    ".faq-inner",
    ".site-footer"
  ];

  const observer =
    !reducedMotion && "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            });
          },
          { threshold: 0.14, rootMargin: "0px 0px -8%" }
        )
      : null;

  const register = (element, index) => {
    if (observed.has(element)) return;

    observed.add(element);
    element.setAttribute("data-scroll-reveal", "");
    if (!element.dataset.revealDelay && index > 0) element.dataset.revealDelay = String(Math.min(index, 3));

    if (observer) {
      observer.observe(element);
    } else {
      element.classList.add("is-revealed");
    }
  };

  namespace.scrollReveal = {
    init(root) {
      const scope = root || document;
      document.documentElement.classList.add("reveal-ready");
      selectors.forEach((selector) => {
        scope.querySelectorAll(selector).forEach(register);
      });
    }
  };
})(window, document);
