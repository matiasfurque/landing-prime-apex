(function loadApexRegions() {
  "use strict";

  const regions = ["intro", "header", "hero", "benefits", "benefit-drawer", "offers", "faq", "footer"];

  const loadRegion = async (name) => {
    const host = document.querySelector(`[data-region="${name}"]`);
    const response = await fetch(`../apex/regions/${name}.html`);

    if (!response.ok) {
      throw new Error(`No se pudo cargar la región ${name}.`);
    }

    const markup = (await response.text()).replaceAll("#APP_FILES#", "../static/");
    host.outerHTML = markup;
  };

  Promise.all(regions.map(loadRegion))
    .then(() => window.PrimeLanding.init(document))
    .catch((error) => {
      document.body.innerHTML = `<p style="padding:2rem;font-family:sans-serif">${error.message}</p>`;
      console.error(error);
    });
})();
