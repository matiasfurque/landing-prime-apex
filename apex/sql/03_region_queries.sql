-- BENEFICIOS: fuente para una región Cards o Classic Report.
select benefit_key,
       eyebrow,
       title,
       summary,
       display_order,
       'javascript:PrimeLanding.drawer.open(''' ||
         apex_escape.js_literal(benefit_key) || ''');' as target_url
  from jp_benefit
 where active_yn = 'Y'
 order by display_order;

-- LOGOS DE BENEFICIOS: usar como consulta maestra-detalle si se administra desde APEX.
select logo_id,
       benefit_key,
       '#APP_FILES#' || file_path as image_url,
       alt_text,
       display_order
  from jp_benefit_logo
 order by benefit_key, display_order;

-- OFERTAS: fuente para el componente carrusel.
select offer_key,
       eyebrow,
       title,
       summary,
       case when image_path is not null then '#APP_FILES#' || image_path end as image_url,
       image_alt,
       visual_value,
       visual_label,
       action_label,
       action_url,
       display_order
  from jp_offer
 where active_yn = 'Y'
 order by display_order;

-- PREGUNTAS: fuente para una región Classic Report con template personalizado.
select faq_id,
       question,
       answer,
       display_order
  from jp_faq
 where active_yn = 'Y'
 order by display_order;
