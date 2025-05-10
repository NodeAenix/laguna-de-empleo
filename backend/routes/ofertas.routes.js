const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { postOferta, getOfertas, getOfertaById, patchOferta, deleteOferta } = require('../controllers/oferta.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const Empresa = require('../models/empresa');

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

// Obtener oferta por ID
router.get('/:id', getOfertaById);

// Actualizar oferta
router.patch('/:id', [
    check('titulo').optional({ values: [null, ''] }),
    check('descripcion').optional({ values: [null, ''] }),
    check('tecnologias').optional({ values: [null, ''] }),
    check('idiomas').optional({ values: [null, ''] }),
    check('modalidad').optional({ values: [null, ''] }),
    check('direccion').optional({ values: [null, ''] }),
    validateJWT(Empresa),
    validateFields
], patchOferta);

// Borrar oferta
router.delete('/:id', deleteOferta);

module.exports = router;
