const Log = require('../models/log');

const createLog = async(admin_id, tipo_validacion, referencia_id, resultado, comentario) => {
    try {
        await Log.create({
            admin_id,
            tipo_validacion,
            referencia_id,
            resultado,
            comentario: comentario ?? '',
            fecha_validacion: new Date()
        });
    } catch (error) {
        console.log('Error al loggear:', error);
    }
}

module.exports = {
    createLog
}
