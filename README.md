# Jumbo Prime - versión Oracle APEX

Implementación componentizada de la landing Jumbo Prime para Oracle APEX. Este repositorio es independiente de `landing prime 2`: la landing visual original se conserva sin cambios y funciona como referencia de diseño.

## Arquitectura

```text
landing prime apex/
|-- preview/                    Vista previa local que ensambla las mismas regiones APEX
|-- static/
|   |-- assets/                 Imágenes y logos de la landing
|   |-- fonts/                  Familia Raleway autorizada
|   |-- css/                    Estilos y ajustes del tema Universal Theme
|   `-- js/
|       |-- prime-config.js     Configuración y contenido de respaldo
|       |-- prime-app.js        Inicialización idempotente
|       `-- components/         Un módulo por interacción
|-- apex/
|   |-- regions/                Un archivo HTML por región visual
|   |-- processes/              Proceso AJAX para el panel de alianzas
|   |-- shared-components/      Referencias a Static Application Files
|   `-- sql/                    Modelo de contenido y datos iniciales
`-- tools/                      Validaciones de estructura y sintaxis
```

## Componentes

- Intro con elefantito y respeto por `prefers-reduced-motion`.
- Header y hero con rutas reales de registro e ingreso.
- Carrusel autónomo de Beneficios Prime, con controles, pausa en interacción y soporte táctil.
- Carrusel de Ofertas semanales, con progreso, controles y soporte táctil.
- Secciones independientes de Mensuales Prime y Alianzas.
- Panel lateral accesible para el detalle de alianzas, con fallback local y proceso AJAX de APEX.
- FAQ accesible y animaciones de aparición idempotentes, compatibles con refresh de regiones APEX.

## Vista previa local

Desde esta carpeta, ejecutar:

```powershell
npm run preview
```

Luego abrir `http://127.0.0.1:4174/preview/`.

## Implementación en APEX

1. Ejecutar `apex/sql/01_schema.sql` una única vez en SQL Workshop.
2. Ejecutar `apex/sql/02_seed_data.sql` para cargar beneficios, ofertas y preguntas frecuentes iniciales.
3. Subir el contenido de `static` en **Shared Components > Static Application Files**, conservando las carpetas.
4. Crear una página Blank y asignar la clase CSS `prime-apex-page`.
5. Crear las regiones en el orden indicado en [apex/regions/README.md](apex/regions/README.md).
6. Cargar los CSS y JavaScript indicados en `apex/shared-components`.
7. Crear el proceso AJAX `GET_PRIME_BENEFIT` desde `apex/processes/get_prime_benefit.sql`.
8. Pegar `page-global-config.js` en **Function and Global Variable Declaration**.
9. En una Dynamic Action **After Refresh** de cualquier región dinámica, ejecutar `PrimeLanding.init(document);`.

Los recursos usan `#APP_FILES#` en el HTML y rutas relativas dentro del CSS, por lo que funcionan en cualquier ambiente APEX después de cargar los Static Application Files.

## Verificación

```powershell
npm run check
```

El chequeo valida regiones requeridas, IDs duplicados, recursos estáticos y sintaxis de los módulos JavaScript.
