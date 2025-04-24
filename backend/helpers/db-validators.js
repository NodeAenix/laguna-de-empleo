const Alumno = require('../models/alumno');
const Empresa = require('../models/empresa');

const alumnoEmailExists = async(email = '') => {
    const emailExists = await Alumno.findOne({ email });
    if (emailExists) {
        throw new Error(`El correo electrónico ${email} ya está en uso`);
    }
}

const empresaEmailExists = async(email = '') => {
    const emailExists = await Empresa.findOne({ email });
    if (emailExists) {
        throw new Error(`El correo electrónico ${email} ya está en uso`);
    }
}

module.exports = {
    alumnoEmailExists,
    empresaEmailExists
}
