(function registerPrimeFaq(window) {
  "use strict";

  const namespace = (window.PrimeLanding = window.PrimeLanding || {});

  namespace.faq = {
    init(root) {
      root.querySelectorAll("[data-faq-list]").forEach((list) => {
        if (list.dataset.primeReady === "true") return;

        list.dataset.primeReady = "true";
        list.addEventListener("click", (event) => {
          const item = event.target.closest(".faq-item");

          if (!item || !list.contains(item)) return;

          const shouldOpen = item.getAttribute("aria-expanded") !== "true";

          list.querySelectorAll(".faq-item").forEach((otherItem) => {
            otherItem.setAttribute("aria-expanded", "false");
            otherItem.lastElementChild.textContent = "+";
          });

          item.setAttribute("aria-expanded", String(shouldOpen));
          item.lastElementChild.textContent = shouldOpen ? "−" : "+";
        });
      });
    }
  };
})(window);
