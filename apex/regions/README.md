# Regiones de la página APEX

Crear regiones de tipo **Static Content** y usar `No Template` cuando el template agregue contenedores o márgenes visibles.

Orden recomendado:

| Secuencia | Archivo | Static ID sugerido |
|---:|---|---|
| 10 | `intro.html` | `prime_intro` |
| 20 | `header.html` | `prime_header` |
| 30 | `hero.html` | `prime_hero` |
| 40 | `benefits.html` | `prime_benefits` |
| 50 | `benefit-drawer.html` | `prime_benefit_drawer` |
| 60 | `offers.html` | `prime_offers` |
| 70 | `faq.html` | `prime_faq` |
| 80 | `footer.html` | `prime_footer` |

La región `benefit-drawer` debe permanecer en la página aunque sus datos se obtengan por AJAX. Los IDs y atributos `data-*` son el contrato estable entre el HTML y los controladores JavaScript.

Para una segunda etapa totalmente administrable, reemplazar el contenido repetido de `benefits`, `offers` y `faq` por regiones Cards/Classic Report usando las consultas de `apex/sql/03_region_queries.sql`. La primera implementación conserva el HTML exacto para garantizar paridad visual.
