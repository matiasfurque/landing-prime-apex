# Regiones de la página APEX

Crear regiones de tipo **Static Content** y usar `No Template` cuando el tema agregue contenedores, márgenes o fondos visibles.

| Secuencia | Archivo | Static ID sugerido | Responsabilidad |
|---:|---|---|---|
| 10 | `intro.html` | `prime_intro` | Pantalla de bienvenida. |
| 20 | `header.html` | `prime_header` | Navegación global. |
| 30 | `hero.html` | `prime_hero` | Propuesta principal y accesos. |
| 40 | `benefits.html` | `prime_benefits` | Carrusel de beneficios Prime. |
| 50 | `offers.html` | `prime_offers` | Carrusel de ofertas semanales. |
| 60 | `monthly.html` | `prime_monthly` | Tarjetas de mensuales Prime. |
| 70 | `alliances.html` | `prime_alliances` | Tarjetas de alianzas con apertura de detalle. |
| 80 | `benefit-drawer.html` | `prime_benefit_drawer` | Panel lateral reutilizable para alianzas. |
| 90 | `faq.html` | `prime_faq` | Preguntas frecuentes y CTA final. |
| 100 | `footer.html` | `prime_footer` | Pie de página. |

El orden es parte del contrato visual. `benefit-drawer` debe existir en la página aunque el contenido de sus alianzas se consulte por AJAX.

Los atributos `data-*`, IDs y clases de cada región son el contrato estable con los módulos JavaScript. Para una segunda etapa administrable, las tarjetas repetidas se pueden reemplazar por regiones Cards o Classic Report sin cambiar los controladores ni los estilos.
