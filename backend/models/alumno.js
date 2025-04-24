const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
    },
    telefono: {
        type: Number,
        required: [true, 'El número de teléfono es obligatorio']
    },
    educacion: {
        type: [String],
        required: [true, 'El campo de educación es obligatorio']
    },
    habilidades: {
        type: [String],
        required: [true, 'Las habilidades son obligatorias']
    },
    idiomas: {
        type: [String]
    },
    repositorios: {
        type: [String]
    },
    experiencia_laboral: {
        type: [String]
    },
    municipio: {
        type: String
    },
    fecha_registro: {
        type: Date,
    },
    estado: {
        type: String,
        default: 'pendiente'
    },
    cv_url: {
        type: String
    }
});

module.exports = model('Alumno', AlumnoSchema);
