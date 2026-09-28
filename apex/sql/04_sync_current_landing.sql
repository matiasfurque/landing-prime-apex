prompt Upgrading Jumbo Prime content model for the current landing...

declare
  procedure add_column(p_definition varchar2) is
  begin
    execute immediate 'alter table jp_benefit add (' || p_definition || ')';
  exception
    when others then
      if sqlcode != -1430 then
        raise;
      end if;
  end;
begin
  add_column('image_path varchar2(255 char)');
  add_column('image_position varchar2(12 char) default ''center'' not null');
  add_column('image_square_yn char(1 char) default ''N'' not null');
end;
/

prompt Run 02_seed_data.sql after this migration to publish the current benefits.
