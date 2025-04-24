const mongoose = require('mongoose');
const { removeEmptyFields } = require('../helpers/utils');
const Alumno = require('../models/alumno');

const postAlumno = async(req, res) => {
    const body = req.body;
    const alumno = new Alumno(body);
    alumno.fecha_registro = new Date();

    await alumno.save();

    res.status(201).json(alumno);
}

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

const getAlumnos = async(req, res) => {
    try {
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const patchAlumno = async(req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const updatedAlumno = removeEmptyFields(resto);
    const alumno = await Alumno.findByIdAndUpdate(id, updatedAlumno, { new: true });
    
    if  (!alumno) {
        res.status(404).json({ msg: `Alumno con ID ${id} no encontrado` });
    }

    res.json(alumno);
}

// TODO: implementar funcionalidad para "POST del CV"

module.exports = {
    postAlumno,
    getAlumno,
    getAlumnos,
    patchAlumno
}
