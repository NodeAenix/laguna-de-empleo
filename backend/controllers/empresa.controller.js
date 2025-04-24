const mongoose = require('mongoose');
const Empresa = require('../models/empresa');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
const { removeEmptyFields } = require('../helpers/utils');

const loginEmpresa = async(req, res) => {
    const { email, password } = req.body;

    try {
        const empresa = await Empresa.findOne({ email });
        if (!empresa) {
            return res.status(400).json({ msg: 'El correo electrónico no es correcto' });
        }

        const validPassword = bcrypt.compareSync(password, empresa.password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'La contraseña es incorrecta' });
        }

        const token = await generateJWT(empresa.id);
        res.json({ empresa, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error por parte del servidor' });
    }
}

const registerEmpresa = async(req, res) => {
    const { email, password } = req.body;

    try {
        const empresaExists = await Empresa.findOne({ email });
        if (empresaExists) {
            return res.status(400).json({ msg: 'La empresa ya está registrada' });
        }

        const empresa = new Empresa(req.body);
        const salt = bcrypt.genSaltSync();
        empresa.password = bcrypt.hashSync(password, salt);
        empresa.fecha_registro = new Date();
        await empresa.save();

        const token = await generateJWT(empresa.id);
        res.status(201).json({ empresa, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al guardar la empresa en la base de datos' });
    }
}

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

const getEmpresas = async(req, res) => {
    try {
        const empresas = await Empresa.find();
        res.json(empresas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
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

module.exports = {
    loginEmpresa,
    registerEmpresa,
    getEmpresa,
    getEmpresas,
    patchEmpresa
}
