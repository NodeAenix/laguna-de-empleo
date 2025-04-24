# Documentación API
En este documento se recopila la información acerca de los endpoints de la API que utiliza la aplicación, incluyendo ejemplos de peticiones y respuestas.

## Cómo integrar la API
Para poder trabajar con la API en la aplicación, deberemos levantar el servidor que la provee en la carpeta `backend` con el siguiente comando:
```bash
nodemon app
```
O en caso de no querer utilizar nodemon:
```bash
node app.js
```

## Variables de entorno
Es importante tener configurado el puerto del servidor (`PORT`) y la dirección URI de la base de datos MongoDB (`MONGODB_URI`) en un archivo `.env`. Se dispone de una planilla denominada `.example.env` para poder fijar estas variables.

## Autenticación
Esta API utiliza la autenticación JWT (JSON Web Token). Para autenticarse, se deberá de incluir lo siguiente en la cabecera (header) de la petición: `X-token: <tu JSON web token>`

En las variables de entorno `.env` se debe crear una clave secreta o privada (`SECRETORPRIVATEKEY`).

## Endpoints
### Colección de Alumnos
<details>
    <summary><code>POST</code> - <code>/alumnos/inscribirse</code></summary>

#### Descripción
> Da de alta a un alumno en la base de datos. Si algún campo obligatorio está vacío, no cumple con las validaciones o ya está registrado el email, devuelve un error.
>
> El valor de `estado` se establece a `pendiente` por defecto. El valor de `fecha_registro` toma la fecha y hora del momento en el que se registra el alumno.

#### Parámetros
> | campo       | tipo de dato | obligatorio |
> | ----------- | ------------ | ----------- |
> | nombre      | String       | sí |
> | apellidos   | String       | sí |
> | email       | String       | sí |
> | telefono    | Number       | sí |
> | educacion   | String[]     | sí |
> | habilidades | String[]     | sí |
> | idiomas     | String[]     | no |
> | municipio   | String       | no |

#### Ejemplo de respuesta

**Petición** :
```json
{
    "nombre": "Adonis",
    "apellidos": "del Monte",
    "email": "adonisdelmonte@gmail.com",
    "telefono": 123456789,
    "educacion": ["DAW", "DAM"],
    "habilidades": ["Java", "SpringBoot", "PL/SQL", "Mongo", "Odoo"],
    "idiomas": ["Español", "Inglés"],
    "municipio": "Getafe",
}
```

**Respuesta** :

> Código de HTTP: `201 CREATED`

```json
{
    "_id": "6809f26c8fb9a99ef35a8ddb",
    "nombre": "Adonis",
    "apellidos": "del Monte",
    "email": "adonisdelmonte@gmail.com",
    "telefono": 123456789,
    "educacion": [
        "DAW",
        "DAM"
    ],
    "habilidades": [
        "Java",
        "SpringBoot",
        "PL/SQL",
        "Mongo",
        "Odoo"
    ],
    "idiomas": [
        "Español",
        "Inglés"
    ],
    "repositorios": [],
    "experiencia_laboral": [],
    "municipio": "Getafe",
    "estado": "pendiente",
    "fecha_registro": "2025-04-24T08:12:28.755Z",
    "__v": 0
}
```

#### Ejemplo de error
El usuario ingresa un correo electrónico que ya está en uso:

> Código de HTTP: `400 BAD REQUEST`

```json
{
    "errors": [
        {
            "type": "field",
            "value": "adonisdelmonte@gmail.com",
            "msg": "El correo electrónico adonisdelmonte@gmail.com ya está en uso",
            "path": "email",
            "location": "body"
        }
    ]
}
```
</details>

<details>
    <summary><code>GET</code> - <code>/alumnos/:id</code></summary>

#### Descripción
> Obtiene un alumno por ID. Devuelve un mensaje de error en caso de no encontrarlo o si el ID no tiene el formato de un ID de MongoDB.

#### Parámetros
> Ninguno

#### Ejemplo de respuesta
> Código de HTTP: `200 OK`

```json
{
    "_id": "6809f26c8fb9a99ef35a8ddb",
    "nombre": "Adonis",
    "apellidos": "del Monte",
    "email": "adonisdelmonte@gmail.com",
    "telefono": 123456789,
    "educacion": [
        "DAW",
        "DAM"
    ],
    "habilidades": [
        "Java",
        "SpringBoot",
        "PL/SQL",
        "Mongo",
        "Odoo"
    ],
    "idiomas": [
        "Español",
        "Inglés"
    ],
    "repositorios": [],
    "experiencia_laboral": [],
    "municipio": "Getafe",
    "estado": "pendiente",
    "fecha_registro": "2025-04-24T08:12:28.755Z",
    "__v": 0
}
```

#### Ejemplo de error
El ID del alumno no existe:

> Código de HTTP: `404 NOT FOUND`

```json
{
    "msg": "Alumno no encontrado"
}
```

El ID no tiene formato de mongo:

> Código de HTTP: `400 BAD REQUEST`

```json
{
    "msg": "ID inválido"
}
```
</details>

<details>
    <summary><code>GET</code> - <code>/alumnos</code></summary>

#### Descripción
> Obtiene todos los alumnos.

#### Parámetros
> Ninguno

#### Ejemplo de respuesta
> Código de HTTP: `200 OK`

```json
[
    {
        "_id": "6809f26c8fb9a99ef35a8ddb",
        "nombre": "Adonis",
        "apellidos": "del Monte",
        "email": "adonisdelmonte@gmail.com",
        "telefono": 123456789,
        "educacion": [
            "DAW",
            "DAM"
        ],
        "habilidades": [
            "Java",
            "SpringBoot",
            "PL/SQL",
            "Mongo",
            "Odoo"
        ],
        "idiomas": [
            "Español",
            "Inglés"
        ],
        "repositorios": [],
        "experiencia_laboral": [],
        "municipio": "Getafe",
        "estado": "pendiente",
        "fecha_registro": "2025-04-24T08:12:28.755Z",
        "__v": 0
    },
    {
        ...
    }
]
```
</details>

<details>
    <summary><code>PATCH</code> - <code>/alumnos/:id</code></summary>

#### Descripción
> Actualiza los campos especificados en la petición. Devuelve un error en caso de que se introduzca un email que ya existe o haya un error de validación.

#### Parámetros
> Los parámetros son opcionales y dependen del campo que se desea actualizar.

#### Ejemplo de respuesta

Para un usuario con ID `6809f26c8fb9a99ef35a8ddb` cuyos campos modificados serán "nombre" y "email".

**Petición** :
```json
{
    "nombre": "Zagreo",
    "email": "zagreo@hades.com"
}
```

**Respuesta** :

> Código de HTTP: `200 OK`

```json
{
    "_id": "6809f26c8fb9a99ef35a8ddb",
    "nombre": "Zagreo",
    "apellidos": "del Monte",
    "email": "zagreo@hades.com",
    "telefono": 123456789,
    "educacion": [
        "DAW",
        "DAM"
    ],
    "habilidades": [
        "Java",
        "SpringBoot",
        "PL/SQL",
        "Mongo",
        "Odoo"
    ],
    "idiomas": [
        "Español",
        "Inglés"
    ],
    "repositorios": [],
    "experiencia_laboral": [],
    "municipio": "Getafe",
    "estado": "pendiente",
    "fecha_registro": "2025-04-24T08:12:28.755Z",
    "__v": 0
}
```

#### Ejemplo de error
El usuario ingresa un correo electrónico que ya está en uso:

> Código de HTTP: 400 BAD REQUEST

```json
{
    "errors": [
        {
            "type": "field",
            "value": "adonisdelmonte@gmail.com",
            "msg": "El correo electrónico adonisdelmonte@gmail.com ya está en uso",
            "path": "email",
            "location": "body"
        }
    ]
}
```
</details>

### Colección de Empresas
<details>
    <summary><code>POST</code> - <code>/empresas/login</code></summary>

#### Descripción
> Devuelve la propia empresa que ha iniciado sesión y su JSON web token correspondiente. Si algún campo está vacío o no cumple con las validaciones, devuelve un error.

#### Parámetros
> | campo    | tipo de dato | obligatorio |
> | -------- | ------------ | ----------- |
> | email    | String       | sí |
> | password | String       | sí |

#### Ejemplo de respuesta

**Petición** :
```json
{
    "email": "contact@artifact.com",
    "password": "A123456789a"
}
```

**Respuesta** :

> Código de HTTP: `200 OK`

```json
{
    "empresa": {
        "_id": "6809e3eba93fd80cee17c884",
        "nombre": "ARTtifact Studio S.A.",
        "email": "contact@artifact.com",
        "password": "$2b$10$w2R4OPuYQxGB7MM18EPzleh2DIJ4jskz6Ay.ssI6Zm5xyGvkFXoxW",
        "telefono": 987654321,
        "descripcion": "Una empresa de software",
        "ubicacion": "Calle de Humanes No. 37",
        "estado": "pendiente",
        "fecha_registro": "2025-04-24T07:10:35.364Z",
        "__v": 0
    },
    "token": <JSON web token>
}
```

#### Ejemplo de error
El usuario ingresa un correo electrónico erróneamente:

> Código de HTTP: 400 BAD REQUEST

```json
{
    "msg": "El correo electrónico no es correcto"
}
```

Formato de correo electrónico incorrecto:

> Código de HTTP: 400 BAD REQUEST

```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Formato del correo electrónico no soportado",
            "path": "email",
            "location": "body"
        }
    ]
}
```
</details>

<details>
    <summary><code>POST</code> - <code>/empresas/registro</code></summary>

#### Descripción
> Da de alta a una empresa en la base de datos. Si algún campo obligatorio está vacío, no cumple con las validaciones o ya está registrado el email, devuelve un error.
>
> El valor de `estado` se establece a `pendiente` por defecto. El valor de `fecha_registro` toma la fecha y hora del momento en el que se registra el alumno.

#### Parámetros
> | campo       | tipo de dato | obligatorio |
> | ----------- | ------------ | ----------- |
> | nombre      | String       | sí |
> | email       | String       | sí |
> | password    | String       | sí |
> | telefono    | Number       | sí |
> | descripcion | String       | sí |
> | ubicacion   | String       | sí |

#### Ejemplo de respuesta

**Petición** :
```json
{
    "nombre": "Ejemplo de Empresa",
    "email": "empresa@ejemplo.com",
    "password": "e123456789E",
    "telefono": 123456789,
    "descripcion": "Un ejemplo de una empresa cualquiera",
    "ubicacion": "Av. de Alcalá No. 24"
}
```

**Respuesta** :

> Código de HTTP: `201 CREATED`

```json
{
    "empresa": {
        "nombre": "Ejemplo de Empresa",
        "email": "empresa@ejemplo.com",
        "password": "$2b$10$a76ZO63HUEsedeLy0MbN1ethcjhJu6msvPEaAIrTIy1V5FcKeAtnW",
        "telefono": 123456789,
        "descripcion": "Un ejemplo de una empresa cualquiera",
        "ubicacion": "Av. de Alcalá No. 24",
        "estado": "pendiente",
        "_id": "6809fe068fb9a99ef35a8de8",
        "fecha_registro": "2025-04-24T09:01:58.244Z",
        "__v": 0
    },
    "token": <JSON web token>
}
```

#### Ejemplo de error
El usuario ingresa un correo electrónico que ya está en uso:

> Código de HTTP: `400 BAD REQUEST`

```json
{
    "errors": [
        {
            "type": "field",
            "value": "contact@artifact.com",
            "msg": "El correo electrónico contact@artifact.com ya está en uso",
            "path": "email",
            "location": "body"
        }
    ]
}
```
</details>

<details>
    <summary><code>GET</code> - <code>/empresas/:id</code></summary>

#### Descripción
> Obtiene una empresa por ID. Devuelve un mensaje de error en caso de no encontrarlo o si el ID no tiene el formato de un ID de MongoDB.

#### Parámetros
> Ninguno

#### Ejemplo de respuesta
> Código de HTTP: `200 OK`

```json
{
    "_id": "6809fe068fb9a99ef35a8de8",
    "nombre": "Ejemplo de Empresa",
    "email": "empresa@ejemplo.com",
    "password": "$2b$10$a76ZO63HUEsedeLy0MbN1ethcjhJu6msvPEaAIrTIy1V5FcKeAtnW",
    "telefono": 123456789,
    "descripcion": "Un ejemplo de una empresa cualquiera",
    "ubicacion": "Av. de Alcalá No. 24",
    "estado": "pendiente",
    "fecha_registro": "2025-04-24T09:01:58.244Z",
    "__v": 0
}
```

#### Ejemplo de error
El ID de la empresa no existe:

> Código de HTTP: `404 NOT FOUND`

```json
{
    "msg": "Empresa no encontrada"
}
```

El ID no tiene formato de mongo:

> Código de HTTP: `400 BAD REQUEST`

```json
{
    "msg": "ID inválido"
}
```
</details>

<details>
    <summary><code>GET</code> - <code>/empresas</code></summary>

#### Parámetros
> Ninguno

#### Ejemplo de respuesta
> Código de HTTP: `200 OK`

```json
[
    {
        "_id": "6809e3eba93fd80cee17c884",
        "nombre": "ARTtifact Studio S.A.",
        "email": "contact@artifact.com",
        "password": "$2b$10$w2R4OPuYQxGB7MM18EPzleh2DIJ4jskz6Ay.ssI6Zm5xyGvkFXoxW",
        "telefono": 987654321,
        "descripcion": "Una empresa de software",
        "ubicacion": "Calle de Humanes No. 37",
        "estado": "pendiente",
        "fecha_registro": "2025-04-24T07:10:35.364Z",
        "__v": 0
    },
    {
        ...
    }
]
```
</details>

<details>
    <summary><code>PATCH</code> - <code>/empresas/:id</code></summary>

#### Descripción
> Actualiza los campos especificados en la petición. Devuelve un error en caso de que se introduzca un email que ya existe o haya un error de validación.

#### Parámetros
> Los parámetros son opcionales y dependen del campo que se desea actualizar.

#### Ejemplo de respuesta

Para una empresa con ID `6809fe068fb9a99ef35a8de8` cuyos campos modificados serán "nombre" y "ubicacion".

**Petición** :
```json
{
    "nombre": "Superempresa",
    "ubicacion": "Calle de Gran Vía No. 120"
}
```

**Respuesta** :

> Código de HTTP: `200 OK`

```json
{
    "_id": "6809fe068fb9a99ef35a8de8",
    "nombre": "Superempresa",
    "email": "empresa@ejemplo.com",
    "password": "$2b$10$a76ZO63HUEsedeLy0MbN1ethcjhJu6msvPEaAIrTIy1V5FcKeAtnW",
    "telefono": 123456789,
    "descripcion": "Un ejemplo de una empresa cualquiera",
    "ubicacion": "Calle de Gran Vía No. 120",
    "estado": "pendiente",
    "fecha_registro": "2025-04-24T09:01:58.244Z",
    "__v": 0
}
```

#### Ejemplo de error
El usuario ingresa un correo electrónico que ya está en uso:

> Código de HTTP: 400 BAD REQUEST

```json
{
    "errors": [
        {
            "type": "field",
            "value": "contact@artifact.com",
            "msg": "El correo electrónico contact@artifact.com ya está en uso",
            "path": "email",
            "location": "body"
        }
    ]
}
```
</details>

### Colección de Admins
<details>
    <summary><code>POST</code> - <code>/admins/login</code></summary>

#### Descripción
> Devuelve el propio admin que ha iniciado sesión y su JSON web token correspondiente. Si algún campo está vacío o no cumple con las validaciones, devuelve un error.

#### Parámetros
> | campo    | tipo de dato | obligatorio |
> | -------- | ------------ | ----------- |
> | email    | String       | sí |
> | password | String       | sí |

#### Ejemplo de respuesta

**Petición** :
```json
{
    "email": "admin@example.com",
    "password": "Admin1234"
}
```

**Respuesta** :

> Código de HTTP: `200 OK`

```json
{
    "admin": {
        "_id": "680a07c7cfc03f8183ab655e",
        "nombre": "Administrador",
        "email": "admin@example.com",
        "password": "$2b$10$mVq74MrAha1xQskJNgXdCuSj3lrOWKEmowYBGTvaVIjoCZzMfsiCS",
        "__v": 0
    },
    "token": <JSON web token>
}
```

#### Ejemplo de error
El usuario ingresa un correo electrónico erróneamente:

> Código de HTTP: 400 BAD REQUEST

```json
{
    "msg": "El correo electrónico no es correcto"
}
```

Formato de correo electrónico incorrecto:

> Código de HTTP: 400 BAD REQUEST

```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Formato del correo electrónico no soportado",
            "path": "email",
            "location": "body"
        }
    ]
}
```
</details>

<details>
    <summary><code>POST</code> - <code>/admins/registro</code></summary>

#### Descripción
> Da de alta a una empresa en la base de datos. Si algún campo obligatorio está vacío, no cumple con las validaciones o ya está registrado el email, devuelve un error.
>
> El valor de `estado` se establece a `pendiente` por defecto. El valor de `fecha_registro` toma la fecha y hora del momento en el que se registra el alumno.

#### Parámetros
> | campo       | tipo de dato | obligatorio |
> | ----------- | ------------ | ----------- |
> | nombre      | String       | sí |
> | email       | String       | sí |
> | password    | String       | sí |

#### Ejemplo de respuesta

**Petición** :
```json
{
    "nombre": "Administrador",
    "email": "admin@example.com",
    "password": "Admin1234"
}
```

**Respuesta** :

> Código de HTTP: `201 CREATED`

```json
{
    "admin": {
        "nombre": "Administrador",
        "email": "admin@example.com",
        "password": "$2b$10$mVq74MrAha1xQskJNgXdCuSj3lrOWKEmowYBGTvaVIjoCZzMfsiCS",
        "_id": "680a07c7cfc03f8183ab655e",
        "__v": 0
    },
    "token": <JSON web token>
}
```

#### Ejemplo de error
El usuario ingresa un correo electrónico que ya está en uso:

> Código de HTTP: `400 BAD REQUEST`

```json
{
    "errors": [
        {
            "type": "field",
            "value": "admin@example.com",
            "msg": "El correo electrónico admin@example.com ya está en uso",
            "path": "email",
            "location": "body"
        }
    ]
}
```
</details>

<details>
    <summary><code>PATCH</code> - <code>/admins/alumnos/:id/validar</code></summary>

#### Descripción
> Cambia el campo `estado` de un alumno a `activo`. Devuelve un error si el ID es incorrecto.

#### Parámetros
> Ninguno

#### Ejemplo de respuesta
> Código de HTTP: `200 OK`

```json
{
    "_id": "6809f26c8fb9a99ef35a8ddb",
    "nombre": "Zagreo",
    "apellidos": "del Monte",
    "email": "zagreo@hades.com",
    "telefono": 123456789,
    "educacion": [
        "DAW",
        "DAM"
    ],
    "habilidades": [
        "Java",
        "SpringBoot",
        "PL/SQL",
        "Mongo",
        "Odoo"
    ],
    "idiomas": [
        "Español",
        "Inglés"
    ],
    "repositorios": [],
    "experiencia_laboral": [],
    "municipio": "Getafe",
    "estado": "activo",
    "fecha_registro": "2025-04-24T08:12:28.755Z",
    "__v": 0
}
```

#### Ejemplo de error
El ID del alumno no existe:

> Código de HTTP: `404 NOT FOUND`

```json
{
    "msg": "El alumno no se ha encontrado"
}
```

El ID no tiene formato de mongo:

> Código de HTTP: `400 BAD REQUEST`

```json
{
    "msg": "ID inválido"
}
```
</details>

<details>
    <summary><code>PATCH</code> - <code>/admins/alumnos/:id/rechazar</code></summary>

#### Descripción
> Cambia el campo `estado` de un alumno a `inactivo`. Devuelve un error si el ID es incorrecto.

#### Parámetros
> Ninguno

#### Ejemplo de respuesta
Cambia el campo `estado` de un alumno a `inactivo`.

> Código de HTTP: `200 OK`

```json
{
    "_id": "6809f26c8fb9a99ef35a8ddb",
    "nombre": "Zagreo",
    "apellidos": "del Monte",
    "email": "zagreo@hades.com",
    "telefono": 123456789,
    "educacion": [
        "DAW",
        "DAM"
    ],
    "habilidades": [
        "Java",
        "SpringBoot",
        "PL/SQL",
        "Mongo",
        "Odoo"
    ],
    "idiomas": [
        "Español",
        "Inglés"
    ],
    "repositorios": [],
    "experiencia_laboral": [],
    "municipio": "Getafe",
    "estado": "inactivo",
    "fecha_registro": "2025-04-24T08:12:28.755Z",
    "__v": 0
}
```

#### Ejemplo de error
El ID del alumno no existe:

> Código de HTTP: `404 NOT FOUND`

```json
{
    "msg": "El alumno no se ha encontrado"
}
```

El ID no tiene formato de mongo:

> Código de HTTP: `400 BAD REQUEST`

```json
{
    "msg": "ID inválido"
}
```
</details>

<details>
    <summary><code>PATCH</code> - <code>/admins/empresas/:id/validar</code></summary>

#### Descripción
> Cambia el campo `estado` de una empresa a `activo`. Devuelve un error si el ID es incorrecto.

#### Parámetros
> Ninguno

#### Ejemplo de respuesta
Cambia el campo `estado` de una empresa a `activo`.

> Código de HTTP: `200 OK`

```json
{
    "_id": "6809e3eba93fd80cee17c884",
    "nombre": "ARTtifact Studio S.A.",
    "email": "contact@artifact.com",
    "password": "$2b$10$w2R4OPuYQxGB7MM18EPzleh2DIJ4jskz6Ay.ssI6Zm5xyGvkFXoxW",
    "telefono": 987654321,
    "descripcion": "Una empresa de software",
    "ubicacion": "Calle de Humanes No. 37",
    "estado": "activo",
    "fecha_registro": "2025-04-24T07:10:35.364Z",
    "__v": 0
}
```

#### Ejemplo de error
El ID de la empresa no existe:

> Código de HTTP: `404 NOT FOUND`

```json
{
    "msg": "La empresa no se ha encontrado"
}
```

El ID no tiene formato de mongo:

> Código de HTTP: `400 BAD REQUEST`

```json
{
    "msg": "ID inválido"
}
```
</details>

<details>
    <summary><code>PATCH</code> - <code>/admins/empresas/:id/rechazar</code></summary>

#### Descripción
> Cambia el campo `estado` de una empresa a `inactivo`. Devuelve un error si el ID es incorrecto.

#### Parámetros
> Ninguno

#### Ejemplo de respuesta
Cambia el campo `estado` de una empresa a `inactivo`.

> Código de HTTP: `200 OK`

```json
{
    "_id": "6809e3eba93fd80cee17c884",
    "nombre": "ARTtifact Studio S.A.",
    "email": "contact@artifact.com",
    "password": "$2b$10$w2R4OPuYQxGB7MM18EPzleh2DIJ4jskz6Ay.ssI6Zm5xyGvkFXoxW",
    "telefono": 987654321,
    "descripcion": "Una empresa de software",
    "ubicacion": "Calle de Humanes No. 37",
    "estado": "inactivo",
    "fecha_registro": "2025-04-24T07:10:35.364Z",
    "__v": 0
}
```

#### Ejemplo de error
El ID de la empresa no existe:

> Código de HTTP: `404 NOT FOUND`

```json
{
    "msg": "La empresa no se ha encontrado"
}
```

El ID no tiene formato de mongo:

> Código de HTTP: `400 BAD REQUEST`

```json
{
    "msg": "ID inválido"
}
```
</details>
