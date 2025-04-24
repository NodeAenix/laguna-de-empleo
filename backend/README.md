# Instalación de dependencias
Es necesario disponer de `npm` para poder instalar las dependencias del proyecto.

Instalación de dependencias: `npm install`

# Planteamiento de la aplicación
## Propósito
La aplicación consiste en una bolsa de empleo para antiguos alumnos de ciclos informáticos, en donde se cumplen las siguientes características:
- Los alumnos se inscriben en la plataforma y crean un perfil.
- Las empresas se registran en la plataforma y buscan entre los perfiles de los alumnos posibles candidatos.
- Si les interesa a la empresa, contactarán con ellos mediante algún medio de comunicación (correo electrónico o teléfono móvil) que tenga el alumno en su perfil.
- Tanto los alumnos como las empresas se pueden dar de baja en el momento que lo deseen.

## Información del alumno y de la empresa
**Información en el perfil del alumno** :
- Nombre completo
- Información de contacto
- Títulos educativos
- Experiencia laboral (si aplica)
- Tecnologías
- Idiomas
- Proyectos realizados

**Información de la empresa** :
- Nombre de la empresa
- Información de contacto
- Descripción de la empresa
- Ubicación

## Campos de la base de datos
La base de datos que se utiliza en esta aplicación es MongoDB, por lo que en lugar de tablas disponemos de colecciones.

Colección `alumnos`:
- `_id`: identificador único que asigna MongoDB por defecto.
- `nombre`: nombre del alumno
- `apellidos`: apellidos del alumno
- `email`: correo electrónico de contacto
- `password`: contraseña del alumno
- `telefono`: teléfono de contacto
- `educacion`: lista de títulos obtenidos junto a su año e institución.
- `habilidades`: lista de habilidades técnicas (Java, SpringBoot, Angular, etc).
- `idiomas`: competencia de idiomas (opcional).
- `repositorios`: lista de repositorios de GitHub (opcional).
- `experiencia_laboral`: lista de experiencias de trabajo previas (opcional).
- `municipio`: municipio/lugar de vivienda (opcional).
- `fecha_registro`: fecha de alta en la plataforma.
- `estado`: activo, inactivo (si se da de baja) o pendiente (debe ser aceptado por un usuario administrador).
- `cv_url`: url del archivo del CV (almacenado en una nube - opcional).

Colección `empresas`:
- `_id`: identificador único que asigna MongoDB por defecto.
- `nombre`: nombre de la empresa.
- `email`: correo electrónico de contacto
- `password`: contraseña de la empresa
- `telefono`: teléfono de contacto
- `descripción`: descripción de la empresa
- `ubicacion`: ubicación de la empresa
- `fecha_registro`: fecha de alta en la plataforma.
- `estado`: activo, inactivo (si se da de baja) o pendiente (debe ser aceptado por un usuario administrador).

### Usuarios administradores
Adicionalmente dispondremos de una colección llamada `admins` en donde se almacenarán los usuarios administradores de la aplicación. Estos se encargarán de aceptar o rechazar alumnos y empresas que quieran inscribirse en la bolsa.

Colección `admins`:
- `_id`: identificador único que asigna MongoDB por defecto.
- `nombre`: nombre del administrador.
- `email`: correo electrónico.
- `password`: contraseña.

# Endpoints API REST
[Documentación API REST](rest-api-docs.md).

## Alumnos
- Inscripción: `POST /alumnos/inscribirse`
- Obtener perfil: `GET /alumnos/:id`
- Obtener todos: `GET /alumnos`
- Actualizar perfil: `PATCH /alumnos/:id`
- Subir/actualizar CV: `POST /alumnos/:id/cv`

## Empresas
- Login: `POST /empresas/login`
- Registro: `POST /empresas/registro`
- Obtener perfil: `GET /empresas/:id`
- Obtener todos: `GET /empresas`
- Actualizar perfil: `PATCH /empresas/:id`

## Usuarios administradores
- Login: `POST /admin/login`
- Registro: `POST /admin/registro`
- Validar alumno: `PATCH /admin/alumnos/:id/validar`
- Eliminar/rechazar alumno: `DELETE /admin/alumnos/:id/rechazar`
- Validar empresa: `PATCH /admin/alumnos/:id/validar`
- Eliminar/rechazar empresa: `DELETE /admin/alumnos/:id/rechazar`
