const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.routePaths = {
            products: '/api/products'
        };

        this.connectToDatabase();
        this.middlewares();
        this.routes();
        
    }

    async connectToDatabase() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.routePaths.products, require('../routes/products'));
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        }); 
    }

}

module.exports = Server;