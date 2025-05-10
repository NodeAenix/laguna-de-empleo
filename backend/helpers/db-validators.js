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

const validateNif = async(nif = '') => {
    nif = nif.toUpperCase();

    const nifRegex = /^(?:[XYZ]\d{7}|\d{8})[A-Z]$/;
    if (!nifRegex.test(nif)) {
        throw new Error(`El formato del NIF ${nif} no es correcto`);
    }

    let dniNumber = nif.slice(0, -1);
    const controlLetter = nif.slice(-1);
    const validLetters = "TRWAGMYFPDXBNJZSQVHLCKE";

    if (nif.startsWith('X')) dniNumber = '0' + dniNumber.slice(1);
    else if (nif.startsWith('Y')) dniNumber = '1' + dniNumber.slice(1);
    else if (nif.startsWith('Z')) dniNumber = '2' + dniNumber.slice(1);

    if (validLetters[dniNumber % 23] !== controlLetter) {
        throw new Error(`El NIF ${nif} no es válido`);
    }
    return true;
}

module.exports = {
    alumnoEmailExists,
    empresaEmailExists,
    validateNif
}
