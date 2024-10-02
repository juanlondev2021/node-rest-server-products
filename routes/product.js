const { Router } = require('express');
const { productGet, productPut, productPost, productDelete, productPatch, productGetById } = require('../controllers/product.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos.middlewares');
const { nameExist, productExistById } = require('../helpers/db-validator');

const router = Router();


router.get('/', productGet);

router.get('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(productExistById),
  validarCampos
], productGetById);

  router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(productExistById),
    validarCampos
  ], productPut);

  router.post('/',[ check('nombre', 'El nombre no es valido').isAlpha(), 
                    check('nombre', 'El nombre no puede ir vacio').not().isEmpty(),
                    check('nombre').custom( nameExist ),
                    check('precio', 'El precio no puede ir vacio').not().isEmpty(),
                    check('precio', 'El precio debe ser un numero').isNumeric(),
                    check('precio', 'El precio no puede ser letras').not().isAlpha(),
                    validarCampos
                     ], productPost);

  router.delete('/:id',  [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(productExistById),
    validarCampos
  ],productDelete);

  router.patch('/', productPatch);


  module.exports = router;  