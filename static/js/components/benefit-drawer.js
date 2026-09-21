(function registerBenefitDrawer(window, document) {
  "use strict";

  const namespace = (window.PrimeLanding = window.PrimeLanding || {});
  let eventsBound = false;
  let lastFocusedElement = null;

  const getDrawer = () => document.querySelector("[data-benefit-drawer]");

  const mergeWithFallback = (benefitKey, payload) => {
    const fallback = namespace.allianceDetails[benefitKey];

    if (!fallback) return payload;

    return {
      ...fallback,
      ...payload,
      image: payload?.image || fallback.image,
      items: Array.isArray(payload?.items) && payload.items.length ? payload.items : fallback.items
    };
  };

  const loadBenefit = (benefitKey) => {
    const processName = namespace.config.benefitProcess;

    if (!processName || !window.apex?.server?.process) {
      return Promise.resolve(namespace.allianceDetails[benefitKey]);
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

            resolve(mergeWithFallback(benefitKey, payload));
          },
          error: (_request, status, error) => reject(new Error(error || status))
        }
      );
    }).catch(() => namespace.allianceDetails[benefitKey]);
  };

  const renderBenefit = (drawer, detail) => {
    const imageHost = drawer.querySelector("[data-drawer-logo]");
    const listHost = drawer.querySelector("[data-drawer-list]");
    const items = Array.isArray(detail.items) ? detail.items : [];
    const image = detail.image || {};

    drawer.querySelector("[data-drawer-eyebrow]").textContent = detail.eyebrow || "Beneficio Prime";
    drawer.querySelector("[data-drawer-title]").textContent = detail.title || "Beneficio Prime";
    drawer.querySelector("[data-drawer-description]").textContent = detail.description || "";

    const imageElement = document.createElement("span");
    imageElement.className = `drawer-image drawer-image--${image.position || "center"}`;
    imageElement.style.backgroundImage = `url("${namespace.assetUrl(image.src || "assets/alliances-prime-placeholder-one.png")}")`;
    imageHost.replaceChildren(imageElement);

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
    const fallback = namespace.allianceDetails[benefitKey];

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
      }
    });

    document.addEventListener("keydown", (event) => {
      const drawer = getDrawer();

      if (!drawer?.classList.contains("is-open")) return;

      if (event.key === "Escape") close();
      if (event.key === "Tab") keepFocusInside(event, drawer);
    });
  };

  namespace.drawer = { init: bindEvents, open, close };
})(window, document);
