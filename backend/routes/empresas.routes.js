const { Router } = require('express');
const { getEmpresa, deleteEmpresa, putEmpresa } = require('../controllers/empresa.controller');
const { check } = require('express-validator');
const { checkEmail, checkPassword, checkPhoneNumber } = require('../helpers/db-patterns');
const { empresaEmailExists } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const multer = require('multer');
const Empresa = require('../models/empresa');

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Obtener empresa por ID
router.get('/:id', getEmpresa);

// Actualizar perfil
router.put('/', [
    validateJWT(Empresa),
    upload.single('img'),
    check('cif').notEmpty(),
    check('email').custom((email, { req }) => empresaEmailExists(email, { req })).custom(checkEmail),
    check('password').custom(checkPassword),
    check('nombre').notEmpty(),
    check('razon_social').notEmpty(),
    check('direccion_fiscal').notEmpty(),
    check('persona_contacto').notEmpty(),
    check('telefono').custom(checkPhoneNumber),
    check('descripcion').notEmpty(),
    validateFields
], putEmpresa);

// Borrar empresa (desactivar)
router.delete('/', validateJWT(Empresa), deleteEmpresa);

module.exports = router;
