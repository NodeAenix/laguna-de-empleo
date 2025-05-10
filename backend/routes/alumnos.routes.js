const { Router } = require('express');
const { getAlumno, patchAlumno, deleteAlumno } = require('../controllers/alumno.controller');
const { check } = require('express-validator');
const { alumnoEmailExists } = require('../helpers/db-validators');
const { checkEmail, checkPhoneNumber, checkPassword } = require('../helpers/db-patterns');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const Alumno = require('../models/alumno');

const router = Router();

// Obtener alumno por ID
router.get('/:id', getAlumno);

// Actualizar perfil
router.patch('/:id', [
    check('email').optional({ values: [null, ''] }).custom(alumnoEmailExists).custom(checkEmail),
    check('password').optional({ values: [null, ''] }).custom(checkPassword),
    check('telefono').optional({ values: [null, ''] }).custom(checkPhoneNumber),
    check('ciclos_formativos').optional({ values: [null, ''] }),
    check('tecnologias').optional({ values: [null, ''] }),
    validateJWT(Alumno),
    validateFields
], patchAlumno);

// Borrar alumno (desactivar)
router.delete('/:id', validateJWT(Alumno), deleteAlumno);

module.exports = router;
