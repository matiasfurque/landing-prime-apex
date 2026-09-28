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

  namespace.benefitDetails = {
    "prime-points": {
      eyebrow: "Jumbo Más",
      title: "Doble acumulación de puntos",
      description: "Sumá el doble de puntos Jumbo Más en las compras online que participen del beneficio Prime.",
      image: { src: "assets/benefits/benefit-points-v1.png", square: true },
      items: ["Doble puntaje en compras online elegibles.", "Los puntos se acreditan en tu cuenta Jumbo Más.", "Consultá categorías y condiciones vigentes antes de comprar."]
    },
    "prime-intro": {
      eyebrow: "Bienvenida Prime",
      title: "50% en los primeros 3 meses",
      description: "Accedé a un beneficio especial de bienvenida durante los primeros tres meses de tu membresía Prime.",
      image: { src: "assets/benefits/benefit-welcome-v1.png", square: true },
      items: ["Beneficio sujeto a condiciones de alta vigentes.", "Disponible para nuevas suscripciones participantes.", "El descuento se aplica durante los primeros tres meses."]
    },
    "prime-birthday": {
      eyebrow: "Especial para vos",
      title: "Beneficio exclusivo en tu cumpleaños",
      description: "Durante tu mes de cumpleaños vas a poder encontrar un beneficio especial pensado para celebrar siendo socio Prime.",
      image: { src: "assets/benefits/benefit-birthday-v1.png", square: true },
      items: ["Beneficio comunicado durante el mes de cumpleaños.", "Requiere una membresía Prime activa.", "Consultá vigencia y condiciones cuando esté disponible."]
    },
    "prime-daily-offers": {
      eyebrow: "Ahorro diario",
      title: "Ofertas exclusivas todos los días",
      description: "Descubrí promociones exclusivas para socios Prime en categorías seleccionadas y aprovechá más cada compra.",
      image: { src: "assets/benefits/benefit-offers-v1.png", square: true },
      items: ["Promociones renovadas según cada campaña.", "Beneficios disponibles en productos seleccionados.", "Revisá siempre los términos y vigencias comunicados."]
    },
    "prime-shipping": {
      eyebrow: "Envíos Prime",
      title: "Envíos gratis ilimitados",
      description: "Hacé tus compras con envíos bonificados en los pedidos que cumplan el mínimo vigente, todas las veces que los necesites.",
      image: { src: "assets/benefits/benefit-shipping-v1.png", square: true },
      items: ["Disponible en compras superiores al mínimo informado.", "Válido en canales y zonas participantes.", "Consultá las condiciones antes de confirmar tu pedido."]
    },
    "jumbo-mas": {
      eyebrow: "Puntos",
      title: "Doble acumulación Jumbo Más",
      description: "Sumá más puntos en tus compras online y aprovechá beneficios exclusivos para miembros activos de Jumbo Prime.",
      image: { src: "assets/alliances-prime-placeholder-two.png", position: "top" },
      items: ["Doble puntaje en compras online elegibles.", "Canjeá puntos por beneficios.", "Acumulación asociada a tu cuenta Jumbo Más."]
    },
    atencion: {
      eyebrow: "Atención Prime",
      title: "Canal exclusivo de atención",
      description: "Contá con un canal de atención pensado para acompañarte cuando necesitás resolver una consulta sobre tu membresía.",
      image: { src: "assets/alliances-prime-placeholder-two.png", position: "center" },
      items: ["Atención para consultas sobre tu membresía.", "Información sobre beneficios vigentes.", "Canales disponibles según las condiciones comunicadas."]
    }
  };
})(window);
