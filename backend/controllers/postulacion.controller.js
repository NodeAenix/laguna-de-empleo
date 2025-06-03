const Postulacion = require('../models/postulacion');
const Oferta = require('../models/oferta');

const postPostulacion = async(req, res) => {
    const uid = req.user._id;
    const { oferta_id, ...resto} = req.body;

    try {
        // Comprobar si el usuario ya ha postulado para esta oferta
        const existingPostulacion = await Postulacion.findOne({ oferta_id, alumno_id: uid });
        if (existingPostulacion) {
            return res.status(400).json({ msg: 'Ya has realizado una postulación para esta oferta' });
        }

        // Crear postulación
        const postulacion = new Postulacion({ oferta_id, resto });
        postulacion.alumno_id = uid;
        postulacion.fecha_postulacion = new Date();
        await postulacion.save();

        // Actualizar los candidatos de la oferta
        await Oferta.findByIdAndUpdate(oferta_id, { $push: { candidatos: uid } }, { new: true });

        res.json(postulacion);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al guardar la postulación en la base de datos' });
    }
}

// Devuelve las ofertas en las que está postulado el alumno
const getOfertasPostuladasAlumno = async(req, res) => {
    const uid = req.user._id;

    const postulaciones = await Postulacion.find({ alumno_id: uid });
    const ofertaIds = postulaciones.map(p => p.oferta_id);
    const ofertas = await Oferta.find({ _id: { $in: ofertaIds } });

    res.json(ofertas);
}

const patchPostulacion = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }
    
    const postulacion = await Postulacion.findById(id);
    if (!postulacion) {
        return res.status(404).json({ msg: 'Postulación no encontrada' });
    }
    
    const { estado } = req.body;
    postulacion.estado = estado;
    postulacion.save();

    res.json(postulacion);
}

const deletePostulacion = async(req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    try {
        const postulacion = await Postulacion.findByIdAndDelete(id);
        if (!postulacion) {
            return res.status(404).json({ msg: 'Postulación no encontrada' });
        }
    
        res.json({ msg: 'Postulación borrada con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error por parte del servidor' });
    }
}

module.exports = {
    postPostulacion,
    getOfertasPostuladasAlumno,
    patchPostulacion,
    deletePostulacion
}
