const { Router } = require('express');
const { getEmpresa, patchEmpresa, deleteEmpresa } = require('../controllers/empresa.controller');
const { check } = require('express-validator');
const { checkEmail, checkPassword, checkPhoneNumber } = require('../helpers/db-patterns');
const { empresaEmailExists } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

// Obtener empresa por ID
router.get('/:id', getEmpresa);

// Actualizar perfil
router.patch('/:id', [
    check('email').optional({ values: [null, ''] }).custom(empresaEmailExists).custom(checkEmail),
    check('password').optional({ values: [null, ''] }).custom(checkPassword),
    check('nombre').optional({ values: [null, ''] }),
    check('razon_social').optional({ values: [null, ''] }),
    check('direccion_fiscal').optional({ values: [null, ''] }),
    check('persona_contacto').optional({ values: [null, ''] }),
    check('telefono').optional({ values: [null, ''] }).custom(checkPhoneNumber),
    check('descripcion').optional({ values: [null, ''] }),
    validateFields
], patchEmpresa);

// Borrar empresa (desactivar)
router.delete('/:id', deleteEmpresa);

module.exports = router;
