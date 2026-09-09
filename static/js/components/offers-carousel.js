(function registerOffersCarousel(window) {
  "use strict";

  const namespace = (window.PrimeLanding = window.PrimeLanding || {});

  class PrimeCarousel {
    constructor(element) {
      this.element = element;
      this.slides = Array.from(element.querySelectorAll("[data-slide]"));
      this.dots = Array.from(element.querySelectorAll(".dot"));
      this.previous = element.querySelector(".carousel-prev");
      this.next = element.querySelector(".carousel-next");
      this.activeIndex = 0;
      this.paused = false;
      this.pointerStart = null;
    }

    init() {
      if (!this.slides.length || this.element.dataset.primeReady === "true") return;

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

      this.dots.forEach((dot, index) => {
        dot.addEventListener("click", () => this.interact(index));
        dot.addEventListener("animationend", (event) => {
          if (event.animationName === "carousel-progress" && index === this.activeIndex && !this.paused) {
            this.goTo(this.activeIndex + 1);
          }
        });
      });

      this.render();
    }

    handleSwipe(pointerEnd) {
      if (this.pointerStart === null) return;

      const distance = pointerEnd - this.pointerStart;
      this.pointerStart = null;

      if (Math.abs(distance) < 50) return;

      this.interact(distance > 0 ? this.activeIndex - 1 : this.activeIndex + 1);
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
      this.dots[this.activeIndex]?.classList.remove("is-loading");
    }

    start() {
      this.paused = false;
      this.render();
    }

    render() {
      const previousIndex = (this.activeIndex - 1 + this.slides.length) % this.slides.length;
      const nextIndex = (this.activeIndex + 1) % this.slides.length;

      this.slides.forEach((slide, index) => {
        const isActive = index === this.activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.classList.toggle("is-prev", index === previousIndex);
        slide.classList.toggle("is-next", index === nextIndex);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      this.dots.forEach((dot, index) => {
        const isActive = index === this.activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.classList.remove("is-loading");
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });

      if (!this.paused) {
        window.requestAnimationFrame(() => this.dots[this.activeIndex]?.classList.add("is-loading"));
      }
    }
  }

  namespace.carousel = {
    init(root) {
      root.querySelectorAll("[data-carousel]").forEach((element) => new PrimeCarousel(element).init());
    }
  };
})(window);
