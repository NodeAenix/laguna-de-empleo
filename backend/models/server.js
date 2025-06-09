const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');
const path = require('path');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use('/auth', require('../routes/auth.routes'));
        this.app.use('/admin', require('../routes/admin.routes'));
        this.app.use('/alumnos', require('../routes/alumnos.routes'));
        this.app.use('/empresas', require('../routes/empresas.routes'));
        this.app.use('/ofertas', require('../routes/ofertas.routes'));
        this.app.use('/postulaciones', require('../routes/postulaciones.routes'));
        this.app.use('/subidas', require('../routes/subida.routes'));
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
    }

    async connectDB() {
        await dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Escuchando al puerto', this.port);
        });
    }

}

module.exports = Server;
