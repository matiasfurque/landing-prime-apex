# Jumbo Prime - versión Oracle APEX

Este proyecto reproduce la landing de Jumbo Prime y la organiza para implementarla de forma profesional en Oracle APEX. La landing original no forma parte de esta carpeta y no se modifica.

## Estructura

```text
landing prime apex/
|-- preview/                    Vista previa local ensamblada desde las regiones
|-- static/
|   |-- assets/                Imágenes y logos
|   |-- fonts/                 Familia Raleway autorizada
|   |-- css/prime.css          Estilos de la landing
|   `-- js/
|       |-- prime-config.js    Configuración y datos de respaldo
|       |-- prime-app.js       Inicialización general
|       `-- components/        Un archivo por comportamiento
`-- apex/
    |-- regions/               Una región APEX por bloque visual
    |-- processes/             Procesos AJAX de APEX
    |-- shared-components/     Configuración para Static Application Files
    `-- sql/                   Modelo de datos y contenido inicial
```

## Vista previa local

La vista previa utiliza los mismos fragmentos de `apex/regions` que después se cargan en APEX. Por seguridad del navegador debe abrirse mediante un servidor HTTP, no directamente con doble clic.

Desde esta carpeta:

```powershell
python -m http.server 4174
```

Después abrir `http://127.0.0.1:4174/preview/`.

## Implementación en APEX

1. Ejecutar `apex/sql/01_schema.sql` una sola vez en SQL Workshop.
2. Ejecutar `apex/sql/02_seed_data.sql` para cargar beneficios, ofertas y preguntas frecuentes.
3. Subir el contenido de `static` en Shared Components > Static Application Files, conservando las carpetas.
4. Crear una página Blank con Page Template `Blank with Attributes` o equivalente sin navegación lateral.
5. Crear regiones Static Content en el orden indicado en `apex/regions/README.md` y pegar el contenido de cada archivo.
6. Configurar los archivos CSS y JavaScript con las listas de `apex/shared-components`.
7. Crear un Application Process AJAX llamado `GET_PRIME_BENEFIT` con el código de `apex/processes/get_prime_benefit.sql`.
8. En Page > JavaScript > Function and Global Variable Declaration, pegar `apex/shared-components/page-global-config.js`.
9. En una Dynamic Action `After Refresh` de las regiones dinámicas ejecutar `PrimeLanding.init(document);`.

## Criterio de componentes

- Cada sección visual es una región independiente y puede cambiarse sin afectar a las demás.
- Los comportamientos interactivos son idempotentes: APEX puede refrescar una región sin duplicar eventos.
- El detalle de beneficios consulta APEX por AJAX y conserva datos locales como respaldo para la vista previa.
- Beneficios, ofertas y preguntas quedan modelados en tablas para administrarlos sin editar código.
- Las rutas usan `#APP_FILES#`, por lo que imágenes, fuentes, CSS y JavaScript funcionan en cualquier ambiente APEX.

## Qué falta para obtener un export de aplicación

El número de aplicación, workspace, esquema y versión de APEX dependen del entorno de la empresa. Una vez creada la aplicación allí, APEX puede exportarla como un único archivo SQL instalable. Este proyecto deja preparada la arquitectura y todo el código fuente para hacer esa carga sin rehacer la landing.
