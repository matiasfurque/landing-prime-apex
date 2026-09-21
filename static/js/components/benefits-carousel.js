(function registerBenefitsCarousel(window) {
  "use strict";

  const namespace = (window.PrimeLanding = window.PrimeLanding || {});

  class PrimeBenefitsCarousel {
    constructor(element) {
      this.element = element;
      this.slides = Array.from(element.querySelectorAll("[data-prime-benefit-slide]"));
      this.progress = element.querySelector("[data-prime-benefit-progress]");
      this.previous = element.querySelector("[data-prime-benefit-previous]");
      this.next = element.querySelector("[data-prime-benefit-next]");
      this.activeIndex = Math.max(this.slides.findIndex((slide) => slide.classList.contains("is-active")), 0);
      this.timer = null;
      this.paused = false;
      this.pointerStart = null;
      this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    init() {
      if (this.element.dataset.primeReady === "true" || this.slides.length < 1) return;

      this.element.dataset.primeReady = "true";
      this.previous?.addEventListener("click", () => this.interact(this.activeIndex - 1));
      this.next?.addEventListener("click", () => this.interact(this.activeIndex + 1));
      this.element.addEventListener("mouseenter", () => this.stop());
      this.element.addEventListener("mouseleave", () => this.start());
      this.element.addEventListener("focusin", () => this.stop());
      this.element.addEventListener("focusout", (event) => {
        if (!this.element.contains(event.relatedTarget)) this.start();
      });
      this.element.addEventListener("pointerdown", (event) => {
        this.pointerStart = event.clientX;
      });
      this.element.addEventListener("pointerup", (event) => this.handleSwipe(event.clientX));

      this.render();
      this.start();
    }

    handleSwipe(pointerEnd) {
      if (this.pointerStart === null) return;

      const distance = pointerEnd - this.pointerStart;
      this.pointerStart = null;

      if (Math.abs(distance) >= 50) this.interact(distance > 0 ? this.activeIndex - 1 : this.activeIndex + 1);
    }

    interact(index) {
      this.goTo(index);
      this.start();
    }

    goTo(index) {
      this.activeIndex = (index + this.slides.length) % this.slides.length;
      this.render();
    }

    stop() {
      this.paused = true;
      window.clearTimeout(this.timer);
      this.progress?.classList.add("is-paused");
    }

    start() {
      if (this.reducedMotion || this.slides.length < 2) return;

      this.paused = false;
      this.render();
      window.clearTimeout(this.timer);
      this.timer = window.setTimeout(() => {
        if (!this.paused) this.goTo(this.activeIndex + 1);
        this.start();
      }, namespace.config.benefitCarouselDuration);
    }

    render() {
      this.slides.forEach((slide, index) => {
        const active = index === this.activeIndex;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });

      if (!this.progress || this.reducedMotion || this.paused) return;

      this.progress.classList.remove("is-running", "is-paused");
      void this.progress.offsetWidth;
      this.progress.classList.add("is-running");
    }
  }

  namespace.benefitCarousel = {
    init(root) {
      root.querySelectorAll("[data-prime-benefits]").forEach((element) => new PrimeBenefitsCarousel(element).init());
    }
  };
})(window);
