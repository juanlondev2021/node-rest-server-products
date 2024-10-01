const { Router } = require('express');
const { check } = require('express-validator');

const { validarArchivo } = require('../middlewares/validar_archivo.middleware');
const { validarCampos } = require('../middlewares/validar_campos.middlewares');
const  { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validator');

const router = Router();

router.post('/', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
  validarArchivo,
  check('id', 'No es un id valido').isMongoId(),
  check('coleccion').custom( c => coleccionesPermitidas( c, ['products'])),
  validarCampos
], actualizarImagenCloudinary )
// actualizarImagen);

router.get('/:coleccion/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('coleccion').custom( c => coleccionesPermitidas( c, ['products'])),
  validarCampos], mostrarImagen)

  module.exports = router;  