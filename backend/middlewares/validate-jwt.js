const jwt = require('jsonwebtoken');
const { mongoose } = require('mongoose');

const validateJWT = (Model) => async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Token faltante o incorrecto' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // Comprobar que el modelo es válido
        if (!Model || !(Model.prototype instanceof mongoose.Model)) {
            return res.status(500).json({ msg: 'Modelo de usuario no válido' });
        }

        // Buscar al usuario
        const user = await Model.findById(uid);
        if (!user) {
            return res.status(401).json({ msg: 'Token no válido: el usuario no existe' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'Token no válido' });
    }
}

module.exports = {
    validateJWT
}
