const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { postOferta, getOfertas, getOfertasFromCurrentUser, patchOferta, deleteOferta, getFilteredOfertasForCurrentUser } = require('../controllers/oferta.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const Empresa = require('../models/empresa');
const Alumno = require('../models/alumno');

const router = Router();

// Crear oferta
router.post('/', [
    check('titulo', 'El títlo es obligatorio').notEmpty(),
    check('descripcion', 'La descripción es obligatoria').notEmpty(),
    check('tecnologias', 'Las tecnologías son obligatorias').notEmpty(),
    check('idiomas', 'Los idiomas son obligatorios').notEmpty(),
    check('modalidad', 'La modalidad es obligatoria').notEmpty(),
    check('direccion', 'La dirección es obligatoria').notEmpty(),
    validateJWT(Empresa),
    validateFields
], postOferta);

// Obtener ofertas
router.get('/', getOfertas);

// Obtener ofertas de la empresa actual
router.get('/yo', validateJWT(Empresa), getOfertasFromCurrentUser);

// Obtener ofertas filtradas para el alumno actual
router.get('/filtrado', validateJWT(Alumno), getFilteredOfertasForCurrentUser);

// Actualizar oferta
router.patch('/', [
    check('estado', 'El estado es obligatorio').notEmpty(),
    validateJWT(null),
    validateFields
], patchOferta);

// Borrar oferta
router.delete('/:id', deleteOferta);

module.exports = router;
