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

  namespace.benefits = {
    envios: {
      eyebrow: "Envíos Prime",
      title: "Envíos gratis ilimitados",
      description:
        "Comprá online o en tiendas participantes y aprovechá envíos bonificados en pedidos que superen el mínimo vigente.",
      logos: [{ src: "assets/logo-envios.svg", alt: "Envíos gratis" }],
      items: [
        "Disponible para compras superiores a $60.000.",
        "Aplica en canales participantes.",
        "Ideal para compras grandes o recurrentes."
      ]
    },
    descuentos: {
      eyebrow: "Ahorro semanal",
      title: "Descuentos exclusivos",
      description:
        "Accedé a promociones seleccionadas todas las semanas en Jumbo y Disco, con beneficios especiales al pagar con Cencopay.",
      logos: [
        { src: "assets/logo-jumbo.png", alt: "Jumbo" },
        { src: "assets/logo-disco.png", alt: "Disco" },
        { src: "assets/logo-cencopay-credito.svg", alt: "Cencopay Crédito" }
      ],
      items: [
        "Promos semanales para miembros Prime.",
        "Beneficios en categorías seleccionadas.",
        "Más ahorro usando medios de pago aliados."
      ]
    },
    "jumbo-mas": {
      eyebrow: "Puntos",
      title: "Doble acumulación Jumbo Más",
      description:
        "Sumá más puntos en tus compras online y aprovechá beneficios exclusivos para miembros activos de Jumbo Prime.",
      logos: [{ src: "assets/logo-jumbo-mas.png", alt: "Jumbo Más" }],
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
      logos: [{ src: "assets/logo-shell-box.png", alt: "Shell Box" }],
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
      logos: [{ src: "assets/logo-smiles.png", alt: "Smiles" }],
      items: [
        "Semanas bonus comunicadas previamente.",
        "Canje desde Jumbo Más.",
        "Beneficio ideal para sumar millas más rápido."
      ]
    }
  };
})(window);
