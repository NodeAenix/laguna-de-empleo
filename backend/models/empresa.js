const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    telefono: {
        type: Number,
        required: [true, 'El número de teléfono es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    ubicacion: {
        type: String,
        required: [true, 'La ubicación es obligatoria']
    },
    fecha_registro: {
        type: Date,
    },
    estado: {
        type: String,
        default: 'pendiente'
    }
});

module.exports = model('Empresa', EmpresaSchema);
