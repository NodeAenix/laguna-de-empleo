const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Alumno = require('../models/alumno');

// Endpoints
const getAlumno = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }
    
    const alumno = await Alumno.findById(id);
    if (!alumno) {
        return res.status(404).json({ msg: 'Alumno no encontrado' });
    }

    res.json(alumno);
}

const putAlumno = async(req, res) => {
    const uid = req.user._id;
    const { password, ...updatedAlumno } = req.body;

    const alumno = await Alumno.findById(uid);
    if (!alumno) {
        return res.status(404).json({ msg: 'Alumno no encontrado' });
    }

    const passwordMatches = bcrypt.compareSync(password, alumno.password);
    if (!passwordMatches) {
        return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    const updated = await Alumno.findByIdAndUpdate(uid, updatedAlumno, { new: true });
    res.json(updated);
}

const deleteAlumno = async(req, res) => {
    const uid = req.user._id;
    
    const alumno = await Alumno.findById(uid);
    alumno.estado = 'inactivo';
    alumno.save();
    
    res.json(alumno);
}

module.exports = {
    getAlumno,
    putAlumno,
    deleteAlumno
}
