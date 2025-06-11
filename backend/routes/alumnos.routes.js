const { Router } = require('express');
const { getAlumno, deleteAlumno, putAlumno } = require('../controllers/alumno.controller');
const { check } = require('express-validator');
const { alumnoEmailExists } = require('../helpers/db-validators');
const { checkEmail, checkPhoneNumber, checkPassword } = require('../helpers/db-patterns');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const multer = require('multer');
const Alumno = require('../models/alumno');

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Obtener alumno por ID
router.get('/:id', getAlumno);

// Actualizar perfil
router.put('/', [
    validateJWT(Alumno),
    upload.fields([
        { name: 'cv', maxCount: 1 },
        { name: 'img', maxCount: 1 }
    ]),
    check('nif').notEmpty(),
    check('email').custom((email, { req }) => alumnoEmailExists(email, { req })).custom(checkEmail),
    check('password').custom(checkPassword),
    check('telefono').custom(checkPhoneNumber),
    check('ciclos_formativos').notEmpty(),
    check('tecnologias').notEmpty(),
    validateFields
], putAlumno);

// Borrar alumno (desactivar)
router.delete('/', validateJWT(Alumno), deleteAlumno);

module.exports = router;
