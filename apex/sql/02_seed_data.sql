prompt Loading Jumbo Prime initial content...

declare
  procedure upsert_benefit(
    p_key      varchar2,
    p_eyebrow varchar2,
    p_title    varchar2,
    p_summary  varchar2,
    p_order    number
  ) is
  begin
    merge into jp_benefit target
    using (
      select p_key benefit_key,
             p_eyebrow eyebrow,
             p_title title,
             p_summary summary,
             p_order display_order
        from dual
    ) source
       on (target.benefit_key = source.benefit_key)
     when matched then update set
       target.eyebrow = source.eyebrow,
       target.title = source.title,
       target.summary = source.summary,
       target.display_order = source.display_order,
       target.active_yn = 'Y'
     when not matched then insert
       (benefit_key, eyebrow, title, summary, display_order, active_yn)
     values
       (source.benefit_key, source.eyebrow, source.title, source.summary, source.display_order, 'Y');
  end;

  procedure upsert_logo(
    p_key   varchar2,
    p_path  varchar2,
    p_alt   varchar2,
    p_order number
  ) is
  begin
    merge into jp_benefit_logo target
    using (
      select p_key benefit_key,
             p_path file_path,
             p_alt alt_text,
             p_order display_order
        from dual
    ) source
       on (target.benefit_key = source.benefit_key and target.display_order = source.display_order)
     when matched then update set
       target.file_path = source.file_path,
       target.alt_text = source.alt_text
     when not matched then insert
       (benefit_key, file_path, alt_text, display_order)
     values
       (source.benefit_key, source.file_path, source.alt_text, source.display_order);
  end;

  procedure upsert_item(
    p_key   varchar2,
    p_text  varchar2,
    p_order number
  ) is
  begin
    merge into jp_benefit_item target
    using (
      select p_key benefit_key,
             p_text item_text,
             p_order display_order
        from dual
    ) source
       on (target.benefit_key = source.benefit_key and target.display_order = source.display_order)
     when matched then update set
       target.item_text = source.item_text
     when not matched then insert
       (benefit_key, item_text, display_order)
     values
       (source.benefit_key, source.item_text, source.display_order);
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
      select p_key offer_key,
             p_eyebrow eyebrow,
             p_title title,
             p_summary summary,
             p_image_path image_path,
             p_image_alt image_alt,
             p_visual_value visual_value,
             p_visual_label visual_label,
             p_action_label action_label,
             p_action_url action_url,
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
       (source.offer_key, source.eyebrow, source.title, source.summary, source.image_path, source.image_alt,
        source.visual_value, source.visual_label, source.action_label, source.action_url, source.display_order, 'Y');
  end;

  procedure upsert_faq(
    p_question varchar2,
    p_answer   varchar2,
    p_order    number
  ) is
  begin
    merge into jp_faq target
    using (
      select p_question question,
             p_answer answer,
             p_order display_order
        from dual
    ) source
       on (target.display_order = source.display_order)
     when matched then update set
       target.question = source.question,
       target.answer = source.answer,
       target.active_yn = 'Y'
     when not matched then insert
       (question, answer, display_order, active_yn)
     values
       (source.question, source.answer, source.display_order, 'Y');
  end;
begin
  upsert_benefit(
    'envios',
    'Envíos Prime',
    'Envíos gratis ilimitados',
    'Comprá online o en tiendas participantes y aprovechá envíos bonificados en pedidos que superen el mínimo vigente.',
    10
  );
  upsert_logo('envios', 'assets/logo-envios.svg', 'Envíos gratis', 10);
  upsert_item('envios', 'Disponible para compras superiores a $60.000.', 10);
  upsert_item('envios', 'Aplica en canales participantes.', 20);
  upsert_item('envios', 'Ideal para compras grandes o recurrentes.', 30);

  upsert_benefit(
    'descuentos',
    'Ahorro semanal',
    'Descuentos exclusivos',
    'Accedé a promociones seleccionadas todas las semanas en Jumbo y Disco, con beneficios especiales al pagar con Cencopay.',
    20
  );
  upsert_logo('descuentos', 'assets/logo-jumbo.png', 'Jumbo', 10);
  upsert_logo('descuentos', 'assets/logo-disco.png', 'Disco', 20);
  upsert_logo('descuentos', 'assets/logo-cencopay-credito.svg', 'Cencopay Crédito', 30);
  upsert_item('descuentos', 'Promos semanales para miembros Prime.', 10);
  upsert_item('descuentos', 'Beneficios en categorías seleccionadas.', 20);
  upsert_item('descuentos', 'Más ahorro usando medios de pago aliados.', 30);

  upsert_benefit(
    'jumbo-mas',
    'Puntos',
    'Doble acumulación Jumbo Más',
    'Sumá más puntos en tus compras online y aprovechá beneficios exclusivos para miembros activos de Jumbo Prime.',
    30
  );
  upsert_logo('jumbo-mas', 'assets/logo-jumbo-mas.png', 'Jumbo Más', 10);
  upsert_item('jumbo-mas', 'Doble puntaje en compras online elegibles.', 10);
  upsert_item('jumbo-mas', 'Canjeá puntos por beneficios.', 20);
  upsert_item('jumbo-mas', 'Acumulación asociada a tu cuenta Jumbo Más.', 30);

  upsert_benefit(
    'shell',
    'Aliados Prime',
    'Doble acumulación Shell Box',
    'Aprovechá beneficios exclusivos en carga de combustible Shell V-Power durante los días comunicados.',
    40
  );
  upsert_logo('shell', 'assets/logo-shell-box.png', 'Shell Box', 10);
  upsert_item('shell', 'Beneficio exclusivo los jueves.', 10);
  upsert_item('shell', 'Disponible en cargas participantes.', 20);
  upsert_item('shell', 'Acumulación asociada a Shell Box.', 30);

  upsert_benefit(
    'smiles',
    'Millas',
    'Millas bonus Smiles',
    'Canjeá tus puntos Jumbo Más por más millas durante semanas bonus y promociones especiales comunicadas.',
    50
  );
  upsert_logo('smiles', 'assets/logo-smiles.png', 'Smiles', 10);
  upsert_item('smiles', 'Semanas bonus comunicadas previamente.', 10);
  upsert_item('smiles', 'Canje desde Jumbo Más.', 20);
  upsert_item('smiles', 'Beneficio ideal para sumar millas más rápido.', 30);

  upsert_offer(
    'despensa', 'Despensa Prime', 'Hasta 35% de descuento',
    'En arroz, aceites, pastas, salsas y básicos para llenar la alacena.',
    'assets/promo-despensa-prime.png', 'Hasta 35% de descuento en despensa Prime',
    null, null, 'Ver oferta', '#comprar', 10
  );
  upsert_offer(
    'belleza', 'Marcas seleccionadas', '10% adicional',
    'En productos de cuidado, bienestar y marcas destacadas para socios Prime.',
    'assets/promo-belleza-prime.png', '10% de descuento adicional en marcas seleccionadas',
    null, null, 'Ver promo', '#comprar', 20
  );
  upsert_offer(
    'mascotas', 'Mascotas', '10% adicional',
    'En alimento, snacks y productos seleccionados para tu mascota.',
    'assets/promo-mascotas-prime.png', '10% de descuento adicional en productos para mascotas',
    null, null, 'Ver promo', '#comprar', 30
  );
  upsert_offer(
    'cencopay', 'Pago recomendado', 'Pagá menos con Cencopay',
    'Beneficio especial para la suscripción durante los primeros meses.',
    null, null, '50%', 'en suscripción', 'Activar', '#comprar', 40
  );

  upsert_faq(
    '¿Qué es Jumbo Prime?',
    'Jumbo Prime es una membresía con beneficios para comprar en Jumbo, Disco y canales asociados, según las condiciones vigentes de cada promoción.',
    10
  );
  upsert_faq(
    '¿Cuáles son los beneficios ofrecidos?',
    'Envíos bonificados, descuentos exclusivos, acumulación de puntos y atención preferencial para miembros activos.',
    20
  );
  upsert_faq(
    '¿Valor y duración de la membresía?',
    'El valor mensual se informa al momento de la suscripción. El período de prueba puede alcanzar hasta 15 días para nuevas altas.',
    30
  );
  upsert_faq(
    '¿Qué canales de atención tengo?',
    'Podés contactar al centro de atención al cliente de Cencosud o consultar desde tu cuenta Prime.',
    40
  );

  commit;
end;
/

prompt Jumbo Prime initial content loaded.
