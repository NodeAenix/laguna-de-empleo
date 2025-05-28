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

const putEmpresa = async(req, res) => {
    const uid = req.user._id;

    const updatedEmpresa = req.body;
    const empresa = await Empresa.findByIdAndUpdate(uid, updatedEmpresa, { new: true });
    
    res.json(empresa);
}

const deleteEmpresa = async(req, res) => {
    const uid = req.user._id;

    const empresa = await Empresa.findById(uid);
    empresa.estado = 'inactivo';
    empresa.save();

    res.json(empresa);
}

module.exports = {
    getEmpresa,
    putEmpresa,
    deleteEmpresa
}
