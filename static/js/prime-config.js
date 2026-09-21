(function configurePrimeLanding(window) {
  "use strict";

  const namespace = (window.PrimeLanding = window.PrimeLanding || {});
  const externalConfig = window.PrimeLandingConfig || {};

  namespace.config = Object.assign(
    {
      assetBase: "#APP_FILES#",
      autoInit: true,
      benefitProcess: "GET_PRIME_BENEFIT",
      carouselDuration: 4200,
      benefitCarouselDuration: 5000,
      introDuration: 2200
    },
    externalConfig
  );

  namespace.assetUrl = function assetUrl(path) {
    const base = namespace.config.assetBase.endsWith("/")
      ? namespace.config.assetBase
      : `${namespace.config.assetBase}/`;
    return `${base}${path.replace(/^\//, "")}`;
  };

  namespace.allianceDetails = {
    "jumbo-mas": {
      eyebrow: "Puntos",
      title: "Doble acumulación Jumbo Más",
      description:
        "Sumá más puntos en tus compras online y aprovechá beneficios exclusivos para miembros activos de Jumbo Prime.",
      image: { src: "assets/alliances-prime-placeholder-two.png", position: "top" },
      items: [
        "Doble puntaje en compras online elegibles.",
        "Canjeá puntos por beneficios.",
        "Acumulación asociada a tu cuenta Jumbo Más."
      ]
    },
    shell: {
      eyebrow: "Aliados Prime",
      title: "Doble acumulación Shell Box",
      description:
        "Aprovechá beneficios exclusivos en carga de combustible Shell V-Power durante los días comunicados.",
      image: { src: "assets/alliances-prime-placeholder-one.png", position: "center" },
      items: [
        "Beneficio exclusivo los jueves.",
        "Disponible en cargas participantes.",
        "Acumulación asociada a Shell Box."
      ]
    },
    smiles: {
      eyebrow: "Millas",
      title: "Millas bonus Smiles",
      description:
        "Canjeá tus puntos Jumbo Más por más millas durante semanas bonus y promociones especiales comunicadas.",
      image: { src: "assets/alliances-prime-placeholder-one.png", position: "top" },
      items: [
        "Semanas bonus comunicadas previamente.",
        "Canje desde Jumbo Más.",
        "Beneficio ideal para sumar millas más rápido."
      ]
    },
    atencion: {
      eyebrow: "Atención Prime",
      title: "Canal exclusivo de atención",
      description:
        "Contá con un canal de atención pensado para acompañarte cuando necesitás resolver una consulta sobre tu membresía.",
      image: { src: "assets/alliances-prime-placeholder-two.png", position: "center" },
      items: [
        "Atención para consultas sobre tu membresía.",
        "Información sobre beneficios vigentes.",
        "Canales disponibles según las condiciones comunicadas."
      ]
    },
    365: {
      eyebrow: "Experiencias",
      title: "Beneficios 365",
      description:
        "Disfrutá beneficios exclusivos en experiencias seleccionadas, de acuerdo con las condiciones de la alianza.",
      image: { src: "assets/alliances-prime-placeholder-one.png", position: "bottom" },
      items: [
        "Experiencias y propuestas seleccionadas.",
        "Beneficios sujetos a vigencia.",
        "Consultá las condiciones antes de usarlo."
      ]
    }
  };
})(window);
