const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Empresa = require('../models/empresa');

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
    const { password, ...updatedEmpresa } = req.body;

    const empresa = await Empresa.findById(uid);
    if (!empresa) {
        return res.status(404).json({ msg: 'Empresa no encontrada' });
    }

    const passwordMatches = bcrypt.compareSync(password, empresa.password);
    if (!passwordMatches) {
        return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    const updated = await Empresa.findByIdAndUpdate(uid, updatedEmpresa, { new: true });
    res.json(updated);
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
