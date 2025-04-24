const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const validateJWT = async(req, res, next) => {
    const token = req.header('X-token');

    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const admin = await Admin.findById(uid);
        if (!admin) {
            return res.status(401).json({ msg: 'Token no válido: el usuario no existe' });
        }
        req.admin = admin;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'Token no válido' });
    }
}

module.exports = {
    validateJWT
}
