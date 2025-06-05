const { Router } = require('express');
const { postPostulacion, getOfertasPostuladasAlumno, patchPostulacion, deletePostulacion } = require('../controllers/postulacion.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const Alumno = require('../models/alumno');
const Empresa = require('../models/empresa');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

// Crear postulación
router.post('/', [
    check('oferta_id', 'El ID de la oferta es obligatorio').notEmpty(),
    validateJWT(Alumno),
    validateFields
], postPostulacion);

// Obtener postulaciones del alumno actual
router.get('/yo', validateJWT(Alumno), getOfertasPostuladasAlumno);

// Actualizar el estado de una postulación
router.patch('/estado', validateJWT(Empresa), patchPostulacion);

// Borrar postulación
router.delete('/:id', validateJWT(Alumno), deletePostulacion);

module.exports = router;
