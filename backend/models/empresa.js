const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    cif: {
        type: String,
        required: [true, 'El CIF es obligatorio'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    razon_social: {
        type: String,
        required: [true, 'La razón social es obligatoria']
    },
    direccion_fiscal: {
        type: String,
        required: [true, 'La dirección fiscal es obligatoria']
    },
    persona_contacto: {
        type: String,
        required: [true, 'La persona de contacto es obligatoria']
    },
    telefono: {
        type: Number,
        required: [true, 'El número de teléfono es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    estado: {
        type: String,
        default: 'pendiente'
    },
    fecha_registro: {
        type: Date
    }
});

module.exports = model('Empresa', EmpresaSchema);
