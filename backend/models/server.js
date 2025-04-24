const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use('/alumnos', require('../routes/alumnos.routes'));
        this.app.use('/empresas', require('../routes/empresas.routes'));
        this.app.use('/admins', require('../routes/admin.routes'));
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
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
