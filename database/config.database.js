const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
     
        await mongoose.connect( process.env.MONGODB_CNN, {
          useUnifiedTopology:true
        } );

        console.log('Base de datos Online');
        
    } catch (error) {
        console.log(error);
        throw new Error("Error al iniciar la base de datos");
        
    }
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }

  module.exports = {
    dbConnection
  }