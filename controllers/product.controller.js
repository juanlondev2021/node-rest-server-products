const { response, request }  = require('express');
const Product = require('../models/product.model')


const productGet = async( req=request, res = response ) => {

    //const { nombre = 'no name', apikey } = req.query;
    const { limite = 15, desde=0 } = req.query;
    const query = { state:true };
    //const productos = await Usuario.find(query).skip( Number(desde) ).limit( Number(limite) );

    //const total = await Usuario.countDocuments(query);

    const [total, productos] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).skip( Number(desde) ).limit( Number(limite) )
    ])

    res.json({
        total,
        productos
        
  })
}

const productGetById = async(req, res) => {

  const {id} = req.params;
  const body = req.body;

  //Validar contra bases de datos
  const product = await Product.findById( id, body );

  res.json({
      msn:'mesaje desde el get para solicitar un solo producto controlador',
      product
  })
}

  const productPut = async(req, res) => {

    const {id} = req.params;
    const body = req.body;

    //Validar contra bases de datos
    const product = await Product.findByIdAndUpdate( id, body );

    res.json({
        msn:'mesaje desde el put controlador',
        product
    })
  }

  const productPost = async (req, res) => {

    const { nombre, state, precio, descripcion, disponible, img} = req.body;
    const product = new Product( {nombre, state, precio, descripcion, disponible, img} );

   
    await product.save();

    res.status(201).json({
        msn:'mesaje desde el post controlador',
        product
    })
  }

  const productDelete = async(req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, { state: false })

    res.json({
      product
    })
  }

  const productPatch = (req, res) => {

    
    res.json({
        msn:'mesaje desde el patch controlador',
        
    })
  }


  module.exports = {
    productGet,
    productGetById,
    productPut,
    productPost,
    productDelete,
    productPatch
  }