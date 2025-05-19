const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');

const registerModel = (Model) => async(req, res) => {
    const body = req.body;

    try {
        const modelExists = await Model.findOne({ email: body.email });
        if (modelExists) {
            return res.status(400).json({ msg: `El correo ${body.email} ya está registrado` });
        }

        const model = new Model(body);
        const salt = bcrypt.genSaltSync();
        model.password = bcrypt.hashSync(model.password, salt);
        model.fecha_registro = new Date();
        await model.save();

        const token = await generateJWT(model.id);
        res.json({ model, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al guardar en la base de datos' });
    }
}

const loginModel = (Model) => async(req, res) => {
    const { email, password } = req.body;

    try {
        const model = await Model.findOne({ email });
        if (!model) {
            return res.status(400).json({ msg: 'El correo no es correcto' });
        }

        const validPassword = bcrypt.compareSync(password, model.password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'La contraseña es incorrecta' });
        }

        const token = await generateJWT(model.id);
        res.json({ model, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error por parte del servidor' });
    }
}

const checkStatus = (req, res) => {
    const user = req.user;

    res.json({
        ok: true,
        user: user,
        token: req.header('Authorization').split(' ')[1]
    });
}

module.exports = {
    registerModel,
    loginModel,
    checkStatus
}
