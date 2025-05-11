const mongoose = require('mongoose');
const { removeEmptyFields } = require('../helpers/utils');
const Alumno = require('../models/alumno');

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

const patchAlumno = async(req, res) => {
    const uid = req.user._id;
    const { _id, ...resto } = req.body;

    const updatedAlumno = removeEmptyFields(resto);
    const alumno = await Alumno.findByIdAndUpdate(uid, updatedAlumno, { new: true });

    res.json(alumno);
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
    patchAlumno,
    deleteAlumno
}
