# Ajustes compartidos de APEX

## Página

- Page Template: `Blank with Attributes`.
- Page CSS Classes: `prime-apex-page`.
- Authentication: según la política del workspace; la landing puede configurarse como Public Page.
- Reload on Submit: `Only for Success`.

## Archivos estáticos

Subir las carpetas `assets`, `fonts`, `css` y `js` como Static Application Files. Mantener los nombres y rutas; el código utiliza `#APP_FILES#` como prefijo portable.

## Seguridad

- No utilizar `Escape Special Characters = No` sobre contenido ingresado por usuarios.
- Las regiones estáticas incluidas son código controlado por la aplicación.
- El proceso AJAX valida la clave recibida y genera JSON con `APEX_JSON`; no concatena SQL dinámico.
- Los enlaces externos deben conservar HTTPS.

## Caché

Al reemplazar CSS o JavaScript en producción, APEX actualiza el checksum de `#APP_FILES#`. No es necesario agregar parámetros manuales de versión.
