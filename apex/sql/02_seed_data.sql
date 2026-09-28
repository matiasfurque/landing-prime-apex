prompt Loading current Jumbo Prime landing content...

declare
  procedure upsert_benefit(
    p_key            varchar2,
    p_eyebrow        varchar2,
    p_title          varchar2,
    p_summary        varchar2,
    p_image_path     varchar2,
    p_image_position varchar2,
    p_image_square   char,
    p_order          number
  ) is
  begin
    merge into jp_benefit target
    using (
      select p_key benefit_key,
             p_eyebrow eyebrow,
             p_title title,
             p_summary summary,
             p_image_path image_path,
             p_image_position image_position,
             p_image_square image_square_yn,
             p_order display_order
        from dual
    ) source
       on (target.benefit_key = source.benefit_key)
     when matched then update set
       target.eyebrow = source.eyebrow,
       target.title = source.title,
       target.summary = source.summary,
       target.image_path = source.image_path,
       target.image_position = source.image_position,
       target.image_square_yn = source.image_square_yn,
       target.display_order = source.display_order,
       target.active_yn = 'Y'
     when not matched then insert
       (benefit_key, eyebrow, title, summary, image_path, image_position, image_square_yn, display_order, active_yn)
     values
       (source.benefit_key, source.eyebrow, source.title, source.summary, source.image_path,
        source.image_position, source.image_square_yn, source.display_order, 'Y');
  end;

  procedure upsert_item(
    p_key   varchar2,
    p_text  varchar2,
    p_order number
  ) is
  begin
    merge into jp_benefit_item target
    using (
      select p_key benefit_key, p_text item_text, p_order display_order from dual
    ) source
       on (target.benefit_key = source.benefit_key and target.display_order = source.display_order)
     when matched then update set target.item_text = source.item_text
     when not matched then insert (benefit_key, item_text, display_order)
       values (source.benefit_key, source.item_text, source.display_order);
  end;

  procedure upsert_offer(
    p_key          varchar2,
    p_eyebrow      varchar2,
    p_title        varchar2,
    p_summary      varchar2,
    p_image_path   varchar2,
    p_image_alt    varchar2,
    p_visual_value varchar2,
    p_visual_label varchar2,
    p_action_label varchar2,
    p_action_url   varchar2,
    p_order        number
  ) is
  begin
    merge into jp_offer target
    using (
      select p_key offer_key, p_eyebrow eyebrow, p_title title, p_summary summary,
             p_image_path image_path, p_image_alt image_alt, p_visual_value visual_value,
             p_visual_label visual_label, p_action_label action_label, p_action_url action_url,
             p_order display_order
        from dual
    ) source
       on (target.offer_key = source.offer_key)
     when matched then update set
       target.eyebrow = source.eyebrow,
       target.title = source.title,
       target.summary = source.summary,
       target.image_path = source.image_path,
       target.image_alt = source.image_alt,
       target.visual_value = source.visual_value,
       target.visual_label = source.visual_label,
       target.action_label = source.action_label,
       target.action_url = source.action_url,
       target.display_order = source.display_order,
       target.active_yn = 'Y'
     when not matched then insert
       (offer_key, eyebrow, title, summary, image_path, image_alt, visual_value, visual_label,
        action_label, action_url, display_order, active_yn)
     values
       (source.offer_key, source.eyebrow, source.title, source.summary, source.image_path,
        source.image_alt, source.visual_value, source.visual_label, source.action_label,
        source.action_url, source.display_order, 'Y');
  end;

  procedure upsert_faq(p_question varchar2, p_answer varchar2, p_order number) is
  begin
    merge into jp_faq target
    using (select p_question question, p_answer answer, p_order display_order from dual) source
       on (target.display_order = source.display_order)
     when matched then update set
       target.question = source.question,
       target.answer = source.answer,
       target.active_yn = 'Y'
     when not matched then insert (question, answer, display_order, active_yn)
       values (source.question, source.answer, source.display_order, 'Y');
  end;
begin
  upsert_benefit('prime-points', 'Jumbo Más', 'Doble acumulación de puntos',
    'Sumá el doble de puntos Jumbo Más en las compras online que participen del beneficio Prime.',
    'assets/benefits/benefit-points-v1.png', 'center', 'Y', 10);
  upsert_item('prime-points', 'Doble puntaje en compras online elegibles.', 10);
  upsert_item('prime-points', 'Los puntos se acreditan en tu cuenta Jumbo Más.', 20);
  upsert_item('prime-points', 'Consultá categorías y condiciones vigentes antes de comprar.', 30);

  upsert_benefit('prime-intro', 'Bienvenida Prime', '50% en los primeros 3 meses',
    'Accedé a un beneficio especial de bienvenida durante los primeros tres meses de tu membresía Prime.',
    'assets/benefits/benefit-welcome-v1.png', 'center', 'Y', 20);
  upsert_item('prime-intro', 'Beneficio sujeto a condiciones de alta vigentes.', 10);
  upsert_item('prime-intro', 'Disponible para nuevas suscripciones participantes.', 20);
  upsert_item('prime-intro', 'El descuento se aplica durante los primeros tres meses.', 30);

  upsert_benefit('prime-birthday', 'Especial para vos', 'Beneficio exclusivo en tu cumpleaños',
    'Durante tu mes de cumpleaños vas a poder encontrar un beneficio especial pensado para celebrar siendo socio Prime.',
    'assets/benefits/benefit-birthday-v1.png', 'center', 'Y', 30);
  upsert_item('prime-birthday', 'Beneficio comunicado durante el mes de cumpleaños.', 10);
  upsert_item('prime-birthday', 'Requiere una membresía Prime activa.', 20);
  upsert_item('prime-birthday', 'Consultá vigencia y condiciones cuando esté disponible.', 30);

  upsert_benefit('prime-daily-offers', 'Ahorro diario', 'Ofertas exclusivas todos los días',
    'Descubrí promociones exclusivas para socios Prime en categorías seleccionadas y aprovechá más cada compra.',
    'assets/benefits/benefit-offers-v1.png', 'center', 'Y', 40);
  upsert_item('prime-daily-offers', 'Promociones renovadas según cada campaña.', 10);
  upsert_item('prime-daily-offers', 'Beneficios disponibles en productos seleccionados.', 20);
  upsert_item('prime-daily-offers', 'Revisá siempre los términos y vigencias comunicados.', 30);

  upsert_benefit('prime-shipping', 'Envíos Prime', 'Envíos gratis ilimitados',
    'Hacé tus compras con envíos bonificados en los pedidos que cumplan el mínimo vigente, todas las veces que los necesites.',
    'assets/benefits/benefit-shipping-v1.png', 'center', 'Y', 50);
  upsert_item('prime-shipping', 'Disponible en compras superiores al mínimo informado.', 10);
  upsert_item('prime-shipping', 'Válido en canales y zonas participantes.', 20);
  upsert_item('prime-shipping', 'Consultá las condiciones antes de confirmar tu pedido.', 30);

  upsert_benefit('jumbo-mas', 'Puntos', 'Doble acumulación Jumbo Más',
    'Sumá más puntos en tus compras online y aprovechá beneficios exclusivos para miembros activos de Jumbo Prime.',
    'assets/alliances-prime-placeholder-two.png', 'top', 'N', 60);
  upsert_item('jumbo-mas', 'Doble puntaje en compras online elegibles.', 10);
  upsert_item('jumbo-mas', 'Canjeá puntos por beneficios.', 20);
  upsert_item('jumbo-mas', 'Acumulación asociada a tu cuenta Jumbo Más.', 30);

  upsert_benefit('atencion', 'Atención Prime', 'Canal exclusivo de atención',
    'Contá con un canal de atención pensado para acompañarte cuando necesitás resolver una consulta sobre tu membresía.',
    'assets/alliances-prime-placeholder-two.png', 'center', 'N', 70);
  upsert_item('atencion', 'Atención para consultas sobre tu membresía.', 10);
  upsert_item('atencion', 'Información sobre beneficios vigentes.', 20);
  upsert_item('atencion', 'Canales disponibles según las condiciones comunicadas.', 30);

  update jp_benefit
     set active_yn = 'N'
   where benefit_key not in (
     'prime-points', 'prime-intro', 'prime-birthday', 'prime-daily-offers',
     'prime-shipping', 'jumbo-mas', 'atencion'
   );

  upsert_offer('despensa', 'Despensa Prime', 'Hasta 35% de descuento',
    'En arroz, aceites, pastas, salsas y básicos para llenar la alacena.',
    'assets/promo-despensa-prime.png', 'Hasta 35% de descuento en despensa Prime',
    null, null, 'Ver oferta', '#comprar', 10);
  upsert_offer('belleza', 'Marcas seleccionadas', '10% adicional',
    'En productos de cuidado, bienestar y marcas destacadas para socios Prime.',
    'assets/promo-belleza-prime.png', '10% de descuento adicional en marcas seleccionadas',
    null, null, 'Ver promo', '#comprar', 20);
  upsert_offer('mascotas', 'Mascotas', '10% adicional',
    'En alimento, snacks y productos seleccionados para tu mascota.',
    'assets/promo-mascotas-prime.png', '10% de descuento adicional en productos para mascotas',
    null, null, 'Ver promo', '#comprar', 30);
  upsert_offer('cencopay', 'Pago recomendado', 'Pagá menos con Cencopay',
    'Beneficio especial para la suscripción durante los primeros meses.',
    null, null, '50%', 'en suscripción', 'Activar', '#comprar', 40);

  upsert_faq('¿Qué es Jumbo Prime?',
    'Jumbo Prime es una membresía con beneficios para comprar en Jumbo, Disco y canales asociados, según las condiciones vigentes de cada promoción.', 10);
  upsert_faq('¿Cuáles son los beneficios ofrecidos?',
    'Envíos bonificados, descuentos exclusivos, acumulación de puntos y atención preferencial para miembros activos.', 20);
  upsert_faq('¿Valor y duración de la membresía?',
    'El valor mensual se informa al momento de la suscripción. El período de prueba puede alcanzar hasta 15 días para nuevas altas.', 30);
  upsert_faq('¿Qué canales de atención tengo?',
    'Podés contactar al centro de atención al cliente de Cencosud o consultar desde tu cuenta Prime.', 40);

  commit;
end;
/

prompt Current Jumbo Prime landing content loaded.
