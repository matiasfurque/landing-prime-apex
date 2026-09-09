(function registerBenefitDrawer(window, document) {
  "use strict";

  const namespace = (window.PrimeLanding = window.PrimeLanding || {});
  let eventsBound = false;
  let lastFocusedElement = null;

  const getDrawer = () => document.querySelector("[data-benefit-drawer]");

  const loadBenefit = (benefitKey) => {
    const processName = namespace.config.benefitProcess;

    if (!processName || !window.apex?.server?.process) {
      return Promise.resolve(namespace.benefits[benefitKey]);
    }

    return new Promise((resolve, reject) => {
      window.apex.server.process(
        processName,
        { x01: benefitKey },
        {
          dataType: "json",
          success: (payload) => {
            if (payload?.error) {
              reject(new Error(payload.error));
              return;
            }

            resolve(payload);
          },
          error: (_request, status, error) => reject(new Error(error || status))
        }
      );
    }).catch(() => namespace.benefits[benefitKey]);
  };

  const renderBenefit = (drawer, detail) => {
    const logoHost = drawer.querySelector("[data-drawer-logo]");
    const listHost = drawer.querySelector("[data-drawer-list]");
    const logos = Array.isArray(detail.logos) ? detail.logos : [];
    const items = Array.isArray(detail.items) ? detail.items : [];

    drawer.querySelector("[data-drawer-eyebrow]").textContent = detail.eyebrow || "Beneficio Prime";
    drawer.querySelector("[data-drawer-title]").textContent = detail.title || "Beneficio Prime";
    drawer.querySelector("[data-drawer-description]").textContent = detail.description || "";
    logoHost.classList.toggle("is-row", logos.length > 1);
    logoHost.replaceChildren(
      ...logos.map((logo) => {
        const image = document.createElement("img");
        image.src = namespace.assetUrl(logo.src);
        image.alt = logo.alt || "";
        return image;
      })
    );
    listHost.replaceChildren(
      ...items.map((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        return listItem;
      })
    );
  };

  const close = () => {
    const drawer = getDrawer();

    if (!drawer) return;

    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    drawer.removeAttribute("aria-busy");
    document.body.classList.remove("drawer-open");
    lastFocusedElement?.focus?.();
  };

  const open = async (benefitKey, trigger) => {
    const drawer = getDrawer();
    const fallback = namespace.benefits[benefitKey];

    if (!drawer || !fallback) return;

    lastFocusedElement = trigger || document.activeElement;
    drawer.setAttribute("aria-busy", "true");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");

    const detail = (await loadBenefit(benefitKey)) || fallback;
    renderBenefit(drawer, detail);
    drawer.removeAttribute("aria-busy");
    drawer.querySelector(".drawer-close")?.focus();
  };

  const keepFocusInside = (event, drawer) => {
    const focusable = Array.from(
      drawer.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter((element) => element.offsetParent !== null);

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const bindEvents = () => {
    if (eventsBound) return;

    eventsBound = true;
    document.addEventListener("click", (event) => {
      const closeTrigger = event.target.closest("[data-benefit-close]");

      if (closeTrigger) {
        close();
        return;
      }

      const openTrigger = event.target.closest("[data-benefit-open]");

      if (openTrigger) {
        event.preventDefault();
        open(openTrigger.dataset.benefitOpen, openTrigger);
        return;
      }

      const card = event.target.closest("[data-benefit-card]");
      const isInteractive = event.target.closest("a, button, input, select, textarea");

      if (card && !isInteractive) {
        open(card.dataset.benefitCard, card);
      }
    });

    document.addEventListener("keydown", (event) => {
      const drawer = getDrawer();

      if (!drawer?.classList.contains("is-open")) return;

      if (event.key === "Escape") close();
      if (event.key === "Tab") keepFocusInside(event, drawer);
    });
  };

  namespace.drawer = {
    init() {
      bindEvents();
    },
    open,
    close
  };
})(window, document);
