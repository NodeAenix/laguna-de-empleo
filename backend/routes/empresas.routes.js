const { Router } = require('express');
const { loginEmpresa, registerEmpresa, getEmpresa, getEmpresas, patchEmpresa } = require('../controllers/empresa.controller');
const { check } = require('express-validator');
const { checkEmail, checkPassword, checkPhoneNumber } = require('../helpers/db-patterns');
const { empresaEmailExists } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

// Login
router.post('/login', [
    check('email').custom(checkEmail),
    validateFields
], loginEmpresa);

// Registro
router.post('/registro', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email').custom(empresaEmailExists).custom(checkEmail),
    check('password').custom(checkPassword),
    check('telefono').custom(checkPhoneNumber),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('ubicacion', 'La ubicación es obligatoria').not().isEmpty(),
    validateFields
], registerEmpresa);

// Obtener perfil
router.get('/:id', getEmpresa);

// Obtener todos
router.get('/', getEmpresas);

// Actualizar perfil
router.patch('/:id', [
    check('nombre').optional({ values: [null, ''] }),
    check('email').optional({ values: [null, ''] }).custom(empresaEmailExists).custom(checkEmail),
    check('password').optional({ values: [null, ''] }).custom(checkPassword),
    check('telefono').optional({ values: [null, ''] }).custom(checkPhoneNumber),
    check('descripcion').optional({ values: [null, ''] }),
    check('ubicacion').optional({ values: [null, ''] }),
    validateFields
], patchEmpresa);

module.exports = router;
