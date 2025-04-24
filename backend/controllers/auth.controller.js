const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');

const login = async(req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ msg: 'El nombre de usuario no es correcto' });
        }

        const validPassword = bcrypt.compareSync(password, admin.password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'La contraseña es incorrecta' });
        }

        const token = await generateJWT(admin.id);
        res.json({ admin, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error por parte del servidor' });
    }
}

const register = async(req, res) => {
    const { username, password } = req.body;

    try {
        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            return res.status(400).json({ msg: 'El usuario ya está registrado' });
        }

        const admin = new Admin({ username, password });
        const salt = bcrypt.genSaltSync();
        admin.password = bcrypt.hashSync(password, salt);
        await admin.save();

        const token = await generateJWT(admin.id);
        res.json({ admin, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al guardar el usuario administrador en la base de datos' });
    }
}

module.exports = {
    login,
    register
}
