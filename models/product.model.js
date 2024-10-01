const { Schema, model } = require('mongoose');

const ProductSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique:true
    },
    state:{
        type:Boolean,
        default:true,
    },
    precio:{
        type:Number,
        default:0,
        required: [true, 'El precio es obligatorio']
    },
    descripcion:{
        type:String,

    },
    img: {
        type: String,
        //required:[true, 'la imagen es obligatoria']
    }

})

ProductSchema.methods.toJSON = function(){
    const { __v, ...data} = this.toObject();
    return data;
}

module.exports = model('Product', ProductSchema);