const { Schema, model } = require('mongoose');

const PostulacionSchema = Schema({
    alumno_id: {
        type: Schema.Types.ObjectId,
    },
    oferta_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'El ID de la oferta es obligatorio']
    },
    fecha_postulacion: {
        type: Date
    },
    estado: {
        type: String,
        default: 'postulado'
    }
}, { collection: 'postulaciones' });

module.exports = model('Postulacion', PostulacionSchema);
