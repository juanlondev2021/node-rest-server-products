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

/***
 * 
 * Validar colecciones permitidas
 * **/
const coleccionesPermitidas = ( coleccion = '', colecciones = []) =>{

  const coleccionIncluida = colecciones.includes( coleccion );
  if ( !coleccionIncluida ) {
    throw new Error(` la coleccion no es permitida: ${coleccion}` );
    
  }
  return true;

}


module.exports = {
    nameExist,
    productExistById,
    coleccionesPermitidas
}