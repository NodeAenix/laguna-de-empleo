const Alumno = require('../models/alumno');
const Empresa = require('../models/empresa');

uploadPdf = async(req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No se ha subido ningún fichero' });
    }

    const uid = req.user._id;
    const filePath = `cv/${req.file.filename}`;

    const alumno = await Alumno.findById(uid);
    if (!alumno) {
        return res.status(404).json({ msg: 'Alumno no encontrado' });
    }
    alumno.cv = filePath;
    await alumno.save();

    res.json({ msg: 'Fichero subido con éxito', cv: filePath });
}

uploadImg = async(req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No se ha subido ningún fichero' });
    }

    const uid = req.user._id;
    const filePath = `img/${req.file.filename}`;

    const alumno = await Alumno.findById(uid);
    if (alumno) {
        await Alumno.findByIdAndUpdate(uid, { img: filePath });
    } else {
        const empresa = await Empresa.findById(uid);
        if (!empresa) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        await Empresa.findByIdAndUpdate(uid, { img: filePath });
    }
    
    res.json({ msg: 'Fichero subido con éxito', img: filePath });
}

module.exports = {
    uploadPdf,
    uploadImg
};
