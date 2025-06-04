const { Schema, model } = require('mongoose');

const OfertaSchema = Schema({
    empresa_id: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    tecnologias: {
        type: [String],
        required: [true, 'Las tecnologías son obligatorias']
    },
    idiomas: {
        type: [String],
        required: [true, 'Los idiomas son obligatorios']
    },
    modalidad: {
        type: String,
        required: [true, 'La modalidad es obligatoria']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    fecha_publicacion: {
        type: Date,
    },
    fecha_expiracion: {
        type: Date,
    },
    estado: {
        type: String,
        default: 'disponible'
    },
    candidatos: {
        type: [Schema.Types.ObjectId],
        ref: 'Alumno'
    }
});

module.exports = model('Oferta', OfertaSchema);
