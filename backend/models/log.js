const { Schema, model } = require('mongoose');

const LogSchema = Schema({
    admin_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'El ID del administrador es obligatorio']
    },
    tipo_validacion: {
        type: String,
        required: [true, 'El tipo de validación es obligatorio']
    },
    referencia_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'El ID del referente (empresa o alumno) es obligatorio']
    },
    resultado: {
        type: String,
        required: [true, 'El resultado es obligatorio']
    },
    comentario: {
        type: String
    },
    fecha_validacion: {
        type: Date
    }
});

module.exports = model('Log', LogSchema);
