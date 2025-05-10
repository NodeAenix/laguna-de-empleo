const { Schema, model } = require('mongoose');

const AdminSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del usuario administrador es obligatorio'],
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
    estado: {
        type: String,
        default: 'activo'
    }
});

module.exports = model('Admin', AdminSchema);
