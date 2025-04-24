const { Router } = require('express');
const { postAlumno, getAlumnos, getAlumno, patchAlumno } = require('../controllers/alumno.controller');
const { check } = require('express-validator');
const { alumnoEmailExists } = require('../helpers/db-validators');
const { checkEmail, checkPhoneNumber } = require('../helpers/db-patterns');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

// Inscribirse
router.post('/inscribirse', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('email').custom(alumnoEmailExists).custom(checkEmail),
    check('telefono').custom(checkPhoneNumber),
    check('educacion', 'La educación es obligatoria').not().isEmpty(),
    check('habilidades', 'Las habilidades son obligatorias').not().isEmpty(),
    validateFields
], postAlumno);

// Obtener perfil
router.get('/:id', getAlumno);

// Obtener todos
router.get('/', getAlumnos);

// Actualizar perfil
router.patch('/:id', [
    check('nombre').optional({ values: [null, ''] }),
    check('apellidos').optional({ values: [null, ''] }),
    check('email').optional({ values: [null, ''] }).custom(alumnoEmailExists).custom(checkEmail),
    check('telefono').optional({ values: [null, ''] }).custom(checkPhoneNumber),
    check('educacion').optional({ values: [null, ''] }),
    check('habilidades').optional({ values: [null, ''] }),
    validateFields
], patchAlumno);

// Subir/actualizar CV
router.post('/:id/cv', () => {}); // TODO: implementar funcionalidad

module.exports = router;
