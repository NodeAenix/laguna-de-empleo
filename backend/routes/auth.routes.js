const { Router } = require('express');
const { registerModel, loginModel } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { alumnoEmailExists, empresaEmailExists, validateNif } = require('../helpers/db-validators');
const { checkEmail, checkPassword, checkPhoneNumber } = require('../helpers/db-patterns');
const Alumno = require('../models/alumno');
const Empresa = require('../models/empresa');
const Admin = require('../models/admin');

const router = Router();

// Registrar alumno
router.post('/registro-alumnos', [
    check('nif', 'El NIF es obligatorio').custom(validateNif),
    check('email').custom(alumnoEmailExists).custom(checkEmail),
    check('password').custom(checkPassword),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').notEmpty(),
    check('telefono').custom(checkPhoneNumber),
    check('ciclos_formativos', 'Los ciclos formativos son obligatorios').notEmpty(),
    check('tecnologias', 'Las tecnologías son obligatorias').notEmpty(),
    validateFields
], registerModel(Alumno));

// Registrar empresa
router.post('/registro-empresas', [
    check('cif', 'El CIF es obligatorio').notEmpty(),
    check('email').custom(empresaEmailExists).custom(checkEmail),
    check('password').custom(checkPassword),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('razon_social', 'La razón social es obligatoria').notEmpty(),
    check('direccion_fiscal', 'La dirección fiscal es obligatoria').notEmpty(),
    check('persona_contacto', 'La persona de contacto es obligatoria').notEmpty(),
    check('telefono').custom(checkPhoneNumber),
    check('descripcion', 'La descripción es obligatoria').notEmpty(),
    validateFields
], registerModel(Empresa));

// Registrar admin
router.post('/registro-admin', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email').custom(empresaEmailExists).custom(checkEmail),
    check('password').custom(checkPassword),
    validateFields
], registerModel(Admin));

// Login alumno
router.post('/login-alumnos', [
    check('email').custom(checkEmail),
    check('password').custom(checkPassword),
    validateFields
], loginModel(Alumno));

// Login empresa
router.post('/login-empresas', [
    check('email').custom(checkEmail),
    check('password').custom(checkPassword),
    validateFields
], loginModel(Empresa));

// Login admin
router.post('/login-admin', [
    check('email').custom(checkEmail),
    check('password').custom(checkPassword),
    validateFields
], loginModel(Admin));

module.exports = router;
