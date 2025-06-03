const mongoose = require('mongoose');
const Oferta = require('../models/oferta');
const Alumno = require('../models/alumno');

const postOferta = async(req, res) => {
    const uid = req.user._id;
    const body = req.body;

    try {
        const oferta = new Oferta(body);
        oferta.empresa_id = uid;
        oferta.fecha_publicacion = new Date();
        oferta.save();

        res.json(oferta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al guardar la oferta en la base de datos' });
    }
}

const getOfertas = async(req, res) => {
    const ofertas = await Oferta.find();
    if (!ofertas) {
        return res.status(404).json({ msg: 'No hay ofertas' });
    }

    res.json(ofertas);
}

const getOfertasFromCurrentUser = async(req, res) => {
    const uid = req.user._id;
    const ofertas = await Oferta.find({ empresa_id: uid });
    res.json(ofertas);
}

const getFilteredOfertasForCurrentUser = async(req, res) => {
    const uid = req.user._id;
    const alumno = await Alumno.findById(uid);
    
    if (!alumno) {
        return res.status(404).json({ msg: 'Alumno no encontrado' });
    }

    const tecnologiasAlumno = alumno.tecnologias || [];
    const idiomasAlumno = alumno.idiomas || [];

    const ofertas = await Oferta.find();
    const filteredOfertas = ofertas.filter(oferta => {
        const tecnologias = oferta.tecnologias.filter(t => tecnologiasAlumno.includes(t));
        const idiomas = oferta.idiomas.filter(i => idiomasAlumno.includes(i));
        const checkTecnologias = tecnologias.length >= 2;
        const checkIdiomas = idiomasAlumno.length === 0 || idiomas;
        return checkTecnologias && checkIdiomas;
    });

    res.json(filteredOfertas);
}

const patchOferta = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    const { _id, ...resto } = req.body;
    const updatedOferta = resto;
    const oferta = await Oferta.findByIdAndUpdate(id, updatedOferta, { new: true });

    if (!oferta) {
        res.status(404).json({ msg: `Oferta con ID ${id} no encontrada` });
    }

    res.json(oferta);
}

const deleteOferta = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    try {
        const oferta = await Oferta.findByIdAndDelete(id);
        if (!oferta) {
            return res.status(404).json({ msg: 'Oferta no encontrada' });
        }
    
        res.json({ msg: 'Oferta borrada con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error por parte del servidor' });
    }
}

module.exports = {
    postOferta,
    getOfertas,
    getOfertasFromCurrentUser,
    getFilteredOfertasForCurrentUser,
    patchOferta,
    deleteOferta
}
