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
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const updatedAlumno = removeEmptyFields(resto);
    const alumno = await Alumno.findByIdAndUpdate(id, updatedAlumno, { new: true });
    
    if (!alumno) {
        res.status(404).json({ msg: `Alumno con ID ${id} no encontrado` });
    }

    res.json(alumno);
}

const deleteAlumno = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }
    
    const alumno = await Alumno.findById(id);
    if (!alumno) {
        return res.status(404).json({ msg: 'Alumno no encontrado' });
    }

    alumno.estado = 'inactivo';
    alumno.save();
    
    res.json(alumno);
}

module.exports = {
    getAlumno,
    patchAlumno,
    deleteAlumno
}
