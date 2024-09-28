const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.database');

class Server{

    constructor(){
        this.app = express();
        
        this.port = process.env.PORT || 8080
        this.productsPath = '/api/products';

        //Conetar a base de datos
        this.conectarDB();
        //middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public'));

    }

    routes(){
        this.app.use( this.productsPath, require('../routes/product'))
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en el puerto: ', this.port)
        } );
    }
}

module.exports = Server 