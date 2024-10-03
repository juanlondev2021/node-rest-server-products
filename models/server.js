const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
 
const { dbConnection } = require('../database/config.database');

class Server{

    

    constructor(){
        this.app = express();
        
        this.port = process.env.PORT || 8080
        this.productsPath = '/api/products';
        this.uploadImage = '/api/uploads'

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
        const whiteList = ['http://localhost:4200']
        this.app.use(cors({ origin: whiteList }));

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public'));

        //fileuploads - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));

    }

    routes(){
        this.app.use( this.productsPath, require('../routes/product'));
        this.app.use( this.uploadImage, require('../routes/uploads.routs'))
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en el puerto: ', this.port)
        } );
    }
}

module.exports = Server 