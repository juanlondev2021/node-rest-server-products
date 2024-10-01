const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const Product = require('../models/product.model')
const { response } = require("express");
const { subirArchivo } = require("../helpers/uploads.helper");
const { model } = require('mongoose');





const cargarArchivo = async(req, res = response) =>{

  try {
    //const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' ); ejemplo cambiando los archivos permitidos
    const nombre = await subirArchivo( req.files, undefined, 'imgs' );

    res.json({
        msn: nombre
    });
  } catch (error) {
    res.status(400).json({
        error
    });
  }
  

}

const actualizarImagen = async(req, res = response)=>{

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'products':
            modelo = await Product.findById(id);
            
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el producto con el id: ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({ msn: 'Error al pasar la validacion'});
    }

    //Limpiar imagenes previas
    if (modelo.img) {
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync(pathImagen) ) {
            fs.unlinkSync( pathImagen );
        }
    }

    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json( modelo )
}

const actualizarImagenCloudinary = async(req, res = response)=>{

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'products':
            modelo = await Product.findById(id);
            
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el producto con el id: ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({ msn: 'Error al pasar la validacion'});
    }

    //Limpiar imagenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre    = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url;

    await modelo.save();

    res.json( modelo )
}

const mostrarImagen = async(req, res = response)=>{

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'products':
            modelo = await Product.findById(id);
            
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el producto con el id: ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({ msn: 'Error al pasar la validacion'});
    }

    //Limpiar imagenes previas
    if (modelo.img) {
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen );
        }
    }

    const pathNoImage = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathNoImage );
    
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}