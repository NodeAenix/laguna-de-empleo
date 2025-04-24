const mongoose = require('mongoose');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const Alumno = require('../models/alumno');
const Empresa = require('../models/empresa');
const { generateJWT } = require('../helpers/generateJWT');

const loginAdmin = async(req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ msg: 'El correo electrónico no es correcto' });
        }

        const validPassword = bcrypt.compareSync(password, admin.password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'La contraseña es incorrecta' });
        }

        const token = await generateJWT(admin.id);
        res.json({ admin, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error por parte del servidor' });
    }
}

const registerAdmin = async(req, res) => {
    const { email, password } = req.body;

    try {
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ msg: 'El administrador ya está registrado' });
        }

        const admin = new Admin(req.body);
        const salt = bcrypt.genSaltSync();
        admin.password = bcrypt.hashSync(password, salt);
        admin.fecha_registro = new Date();
        await admin.save();

        const token = await generateJWT(admin.id);
        res.status(201).json({ admin, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al guardar el administrador en la base de datos' });
    }
}

const activateAlumno = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    const alumno = await Alumno.findById(id);
    if (!alumno) {
        return res.status(400).json({ msg: 'El alumno no se ha encontrado' });
    }

    alumno.estado = 'activo';
    alumno.save();
    res.json(alumno);
}

const deactivateAlumno = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    const alumno = await Alumno.findById(id);
    if (!alumno) {
        return res.status(400).json({ msg: 'El alumno no se ha encontrado' });
    }

    alumno.estado = 'inactivo';
    alumno.save();
    res.json(alumno);
}

const activateEmpresa = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    const empresa = await Empresa.findById(id);
    if (!empresa) {
        return res.status(400).json({ msg: 'La empresa no se ha encontrado' });
    }

    empresa.estado = 'activo';
    empresa.save();
    res.json(empresa);
}

const deactivateEmpresa = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    const empresa = await Empresa.findById(id);
    if (!empresa) {
        return res.status(400).json({ msg: 'La empresa no se ha encontrado' });
    }

    empresa.estado = 'inactivo';
    empresa.save();
    res.json(empresa);
}

module.exports = {
    loginAdmin,
    registerAdmin,
    activateAlumno,
    deactivateAlumno,
    activateEmpresa,
    deactivateEmpresa
}
