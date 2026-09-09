(function bootstrapPrimeLanding(window, document) {
  "use strict";

  const namespace = (window.PrimeLanding = window.PrimeLanding || {});

  namespace.init = function initPrimeLanding(root) {
    const scope = root || document;

    namespace.intro?.init(scope);
    namespace.drawer?.init(scope);
    namespace.carousel?.init(scope);
    namespace.faq?.init(scope);
  };

  if (namespace.config.autoInit !== false) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => namespace.init(document), { once: true });
    } else {
      namespace.init(document);
    }
  }
})(window, document);
