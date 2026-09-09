declare
  l_key         jp_benefit.benefit_key%type := lower(trim(apex_application.g_x01));
  l_eyebrow     jp_benefit.eyebrow%type;
  l_title       jp_benefit.title%type;
  l_description jp_benefit.summary%type;
begin
  select eyebrow, title, summary
    into l_eyebrow, l_title, l_description
    from jp_benefit
   where benefit_key = l_key
     and active_yn = 'Y';

  apex_json.open_object;
  apex_json.write('eyebrow', l_eyebrow);
  apex_json.write('title', l_title);
  apex_json.write('description', l_description);

  apex_json.open_array('logos');
  for logo in (
    select file_path, alt_text
      from jp_benefit_logo
     where benefit_key = l_key
     order by display_order
  ) loop
    apex_json.open_object;
    apex_json.write('src', logo.file_path);
    apex_json.write('alt', logo.alt_text);
    apex_json.close_object;
  end loop;
  apex_json.close_array;

  apex_json.open_array('items');
  for item in (
    select item_text
      from jp_benefit_item
     where benefit_key = l_key
     order by display_order
  ) loop
    apex_json.write(item.item_text);
  end loop;
  apex_json.close_array;
  apex_json.close_object;
exception
  when no_data_found then
    apex_json.open_object;
    apex_json.write('error', 'BENEFIT_NOT_FOUND');
    apex_json.close_object;
end;
