const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión de la base de datos');
    }
}

module.exports = {
    dbConnection
}
