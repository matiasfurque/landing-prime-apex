(function registerPrimeIntro(window) {
  "use strict";

  const namespace = (window.PrimeLanding = window.PrimeLanding || {});

  namespace.intro = {
    init(root) {
      const intro = root.querySelector("[data-intro]");

      if (!intro || intro.dataset.primeReady === "true") return;

      intro.dataset.primeReady = "true";
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reducedMotion ? 350 : namespace.config.introDuration;

      window.setTimeout(() => intro.classList.add("is-hidden"), duration);
    }
  };
})(window);
