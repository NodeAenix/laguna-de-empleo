# Laguna de Empleo
## Prerrequisitos
Requerimientos para el programa y herramientas necesarias.
- [Node.js](https://nodejs.org/es) (con npm)
- [Angular](https://angular.dev/installation)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Instalación
1. Clonar el repositorio
    ```bash
    git clone https://github.com/NodeAenix/laguna-de-empleo.git
    ```
2. Instalar paquetes de NPM en las carpetas `backend` y `frontend`
    ```bash
    npm install
    ```
3. Renombrar el fichero `.env.example` de la carpeta `backend` a `.env` y establecer las variables de entorno
    ```bash
    PORT= # puerto de conexión del servidor
    MONGODB_URI= # URI de MongoDB
    SECRETORPRIVATEKEY= # clave para firmar los certificados JWT
    ```

4. Cambiar la URL del "git remote" para evitar subir cambios al proyecto base accidentalmente
    ```bash
    git remote set-url origin github_username/repo_name
    git remote -v # confirmar cambios
    ```

## Planteamiento de la aplicación
### Propósito
La aplicación consiste en una bolsa de empleo para antiguos alumnos de ciclos informáticos, en donde se cumplen las siguientes características:
- Los alumnos se inscriben en la plataforma y crean un perfil.
- Las empresas se registran en la plataforma y crean ofertas de trabajo.
- Los alumnos pueden inscribirse en una oferta para mostrar que están interesadas en ella.
- La empresa puede ver los perfiles de los alumnos que se inscriben en sus ofertas y leer, aceptar o rechazar al candidato.
- Si la empresa está interesada en el candidato, contactará con él mediante algún medio de comunicación (correo electrónico o teléfono móvil).
- Tanto los alumnos como las empresas se pueden dar de baja en el momento que lo deseen.
- Un usuario administrador controlará el alta de los alumnos y las empresas para evitar perfiles falsos.

### Información del alumno y de la empresa
**Información en el perfil del alumno** :
- NIF
- Nombre completo
- Información de contacto
- Títulos educativos
- Tecnologías e idiomas
- Currículum

**Información de la empresa** :
- CIF
- Nombre de la empresa
- Descripción de la empresa
- Razón social
- Información de contacto
- Ubicación

### Colecciones de la base de datos
La base de datos que se utiliza en esta aplicación es MongoDB, por lo que en lugar de tablas disponemos de colecciones.

Colección `alumnos`:
- `_id`: identificador único que asigna MongoDB por defecto.
- `nif`: número de identificación fiscal del alumno.
- `email`: correo electrónico de contacto.
- `password`: contraseña del alumno.
- `nombre`: nombre del alumno.
- `apellidos`: apellidos del alumno.
- `telefono`: teléfono de contacto.
- `ciclos_formativos`: ciclos formativos que ha cursado el alumno.
- `tecnologias`: lista de habilidades técnicas (Java, SpringBoot, Angular, etc).
- `idiomas`: competencia de idiomas (opcional).
- `cv_url`: url del archivo del CV (almacenado en una nube - opcional).
- `descripcion`: breve descripción del perfil del alumno.
- `estado`: activo, inactivo (si se da de baja) o pendiente (debe ser aceptado por un usuario administrador).
- `fecha_registro`: fecha de alta en la plataforma.

Colección `empresas`:
- `_id`: identificador único que asigna MongoDB por defecto.
- `cif`: código de identificación fiscal.
- `email`: correo electrónico de contacto.
- `password`: contraseña de la empresa.
- `nombre`: nombre de la empresa.
- `razon_social`: razón social de la empresa.
- `direccion_fiscal`: dirección fiscal de la empresa.
- `persona_contacto`: persona de contacto.
- `telefono`: teléfono de contacto.
- `descripcion`: breve descripción del perfil de la empresa.
- `estado`: activo, inactivo (si se da de baja) o pendiente (debe ser aceptado por un usuario administrador).
- `fecha_registro`: fecha de alta en la plataforma.

Colección `admins`:
- `_id`: identificador único que asigna MongoDB por defecto.
- `nombre`: nombre del administrador.
- `email`: correo electrónico.
- `password`: contraseña.
- `estado`: activo o inactivo (si se da de baja).

### Colecciones intermedias
Para almacenar las ofertas de las empresas y las postulaciones de los alumnos en ellas, dispondremos de dos colecciones más.

Colección `ofertas`:
- `_id`: identificador único que asigna MongoDB por defecto.
- `empresa_id`: identificador de la empresa.
- `titulo`: título de la oferta.
- `descripcion`: breve descripción de lo que consta la oferta.
- `tecnologias`: tecnologías necesarias para aplicar a la oferta.
- `idiomas`: idiomas necesarios para aplicar a la oferta.
- `modalidad`: modalidad presencial, a distancia o mixta.
- `dirección`: dirección en donde se realizará el trabajo (a no ser que sea enteramente presencial).
- `fecha_publicacion`: fecha de publicación de la oferta.
- `fecha_expiracion`: fecha de expiración de la oferta.
- `estado`: disponible o terminada.
- `candidatos`: lista de los identificadores de los candidatos que se postulan en la oferta.

Colección `postulaciones`:
- `_id`: identificador único que asigna MongoDB por defecto.
- `alumno_id`: identificador del alumno candidato.
- `oferta_id`: identificador de la oferta.
- `fecha_postulacion`: fecha en la que el alumno se ha postulado.
- `estado`: postulado (cuando el alumno se postula en la oferta), visto (cuando la empresa marca que ha visto la candidatura del alumno), aceptado (si la empresa lo acepta), rechazado (si aceptan a otro candidato) o cancelado (si el alumno cancela su postulación).

### Colecciones adicionales
Al disponer de usuarios administradores, también se dispone de la siguiente colección.

Colección `logs_validacion`:
- `_id`: identificador único que asigna MongoDB por defecto.
- `admin_id`: identificador del administrador que realizó la acción.
- `tipo_validacion`: qué coleccion ha validado (alumno o empresa).
- `referencia_id`: identificador de la entrada validada en la otra colección.
- `resultado`: resultado de la validación (activo o inactivo).
- `comentario`: comentario respecto a la validación (opcional).
- `fecha_validacion`: fecha en la que se ha realizado la validación.

## Endpoints API REST
[Documentación API REST](rest-api-docs.md).

### Auth (login, registro y perfil)
- `POST /auth/registro-alumnos`
- `POST /auth/registro-empresas`
- `POST /auth/registro-admin`
- `POST /auth/login-alumnos`
- `POST /auth/login-empresas`
- `POST /auth/login-admin`

### Alumnos
- `GET /alumnos/:id`
- `PATCH /alumnos`
- `DELETE /alumnos`

### Empresas
- `GET /empresas/:id`
- `PATCH /empresas/:id`
- `DELETE /empresas/:id`

### Ofertas
- `POST /ofertas`
- `GET /ofertas`
- `GET /ofertas/:id`
- `PATCH /ofertas/:id`
- `DELETE /ofertas/:id`

### Postulaciones
- `POST /postulaciones`
- `GET /postulaciones/:id`
- `PATCH /postulaciones/:id/estado`
- `DELETE /postulaciones/:id`

### Admin
- `GET /admin/pendientes`
- `PATCH /admin/validar-alumno/:id`
- `PATCH /admin/rechazar-alumno/:id`
- `PATCH /admin/validar-empresa/:id`
- `PATCH /admin/rechazar-empresa/:id`
