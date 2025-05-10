const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nif: {
        type: String,
        required: [true, 'El NIF es obligatorio'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios']
    },
    telefono: {
        type: Number,
        required: [true, 'El número de teléfono es obligatorio']
    },
    ciclos_formativos: {
        type: [String],
        required: [true, 'Los ciclos formativos son obligatorios']
    },
    tecnologias: {
        type: [String],
        required: [true, 'Las tecnologías son obligatorias']
    },
    idiomas: {
        type: [String]
    },
    cv_url: {
        type: String
    },
    estado: {
        type: String,
        default: 'pendiente'
    },
    fecha_registro: {
        type: Date
    }
});

module.exports = model('Alumno', AlumnoSchema);
