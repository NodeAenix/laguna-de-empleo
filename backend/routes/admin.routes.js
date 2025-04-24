const { Router } = require('express');
const { loginAdmin, registerAdmin, activateAlumno, deactivateAlumno, activateEmpresa, deactivateEmpresa } = require('../controllers/admin.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { checkEmail, checkPassword, checkPhoneNumber } = require('../helpers/db-patterns');
const { empresaEmailExists } = require('../helpers/db-validators');

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
router.patch('/alumnos/:id/validar', activateAlumno);

// Desactivar o rechazar alumno
router.patch('/alumnos/:id/rechazar', deactivateAlumno);

// Activar empresa
router.patch('/empresas/:id/validar', activateEmpresa);

// Desactivar o rechazar empresa
router.patch('/empresas/:id/rechazar', deactivateEmpresa);

module.exports = router;
