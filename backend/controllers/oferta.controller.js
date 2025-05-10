const mongoose = require('mongoose');
const Oferta = require('../models/oferta');
const { removeEmptyFields } = require('../helpers/utils');

const postOferta = async(req, res) => {
    const uid = req.user._id;
    const body = req.body;

    try {
        const oferta = new Oferta(body);
        oferta.empresa_id = uid;
        oferta.fecha_publicacion = new Date();
        oferta.save();

        res.json(oferta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al guardar la oferta en la base de datos' });
    }
}

const getOfertas = async(req, res) => {
    const ofertas = await Oferta.find();
    if (!ofertas) {
        return res.status(404).json({ msg: 'No hay ofertas' });
    }

    res.json(ofertas);
}

const getOfertaById = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    const oferta = await Oferta.findById(id);
    if (!oferta) {
        return res.status(404).json({ msg: 'Oferta no encontrada' });
    }

    res.json(oferta);
}

const patchOferta = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    const { _id, ...resto } = req.body;
    const updatedOferta = removeEmptyFields(resto);
    const oferta = await Oferta.findByIdAndUpdate(id, updatedOferta, { new: true });

    if (!oferta) {
        res.status(404).json({ msg: `Oferta con ID ${id} no encontrada` });
    }

    res.json(oferta);
}

const deleteOferta = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    try {
        const oferta = await Oferta.findByIdAndDelete(id);
        if (!oferta) {
            return res.status(404).json({ msg: 'Oferta no encontrada' });
        }
    
        res.json({ msg: 'Oferta borrada con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error por parte del servidor' });
    }
}

module.exports = {
    postOferta,
    getOfertas,
    getOfertaById,
    patchOferta,
    deleteOferta
}
