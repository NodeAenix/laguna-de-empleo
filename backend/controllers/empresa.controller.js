const mongoose = require('mongoose');
const Empresa = require('../models/empresa');
const { removeEmptyFields } = require('../helpers/utils');

const getEmpresa = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    const empresa = await Empresa.findById(id);
    if (!empresa) {
        return res.status(404).json({ msg: 'Empresa no encontrada' });
    }

    res.json(empresa);
}

const patchEmpresa = async(req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const updatedEmpresa = removeEmptyFields(resto);
    const empresa = await Empresa.findByIdAndUpdate(id, updatedEmpresa, { new: true });
    
    if  (!empresa) {
        res.status(404).json({ msg: `Empresa con ID ${id} no encontrado` });
    }

    res.json(empresa);
}

const deleteEmpresa = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    const empresa = await Empresa.findById(id);
    if (!empresa) {
        return res.status(404).json({ msg: 'Empresa no encontrada' });
    }

    empresa.estado = 'inactivo';
    empresa.save();

    res.json(empresa);
}

module.exports = {
    getEmpresa,
    patchEmpresa,
    deleteEmpresa
}
