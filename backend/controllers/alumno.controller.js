const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { removeEmptyFields } = require('../helpers/utils');
const Alumno = require('../models/alumno');

// Almacenamiento de "multer" (para los archivos de los CV)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const filename = `${uuidv4()}-${file.originalname}.pdf`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

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
    putAlumno,
    deleteAlumno
}
