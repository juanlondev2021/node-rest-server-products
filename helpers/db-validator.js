const Usuario = require('../models/product.model');


const nameExist = async(nombre = '') => {
     //validacion de campos obligatorios
     const existeNombre = await Usuario.findOne({nombre});
     if ( existeNombre ) {
       throw new Error(`El nombre: ${ nombre} ya existe`);
       
     }
}

const productExistById = async(id) => {
    //validacion de campos obligatorios
    const existeProducto = await Usuario.findOne({id});
    if ( !existeProducto ) {
      throw new Error(`El id: ${ id} no existe`);
      
    }

}

module.exports = {
    nameExist,
    productExistById 
}