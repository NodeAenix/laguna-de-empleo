const { Router } = require('express');
const { loginAdmin, registerAdmin, activateAlumno, deactivateAlumno, activateEmpresa, deactivateEmpresa } = require('../controllers/admin.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { checkEmail, checkPassword } = require('../helpers/db-patterns');
const { empresaEmailExists } = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const Admin = require('../models/admin');

const router = Router();

// Login
router.post('/login', [
    check('email').custom(checkEmail),
    validateFields
], loginAdmin);

// Registro
router.post('/registro', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email').custom(empresaEmailExists).custom(checkEmail),
    check('password').custom(checkPassword),
    validateFields
], registerAdmin);

// Activar alumno
router.patch('/validar-alumno/:id', validateJWT(Admin), activateAlumno);

// Desactivar o rechazar alumno
router.patch('/rechazar-alumno/:id', validateJWT(Admin), deactivateAlumno);

// Activar empresa
router.patch('/validar-empresa/:id', validateJWT(Admin), activateEmpresa);

// Desactivar o rechazar empresa
router.patch('/rechazar-empresa/:id', validateJWT(Admin), deactivateEmpresa);

module.exports = router;
