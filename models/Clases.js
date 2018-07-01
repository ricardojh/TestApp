var mongoose =require('mongoose');

//var Schema = mongoose.Schema;
//var Alumnos =mongoose.model('Alumnos');   

var ClasesSchema= new mongoose.Schema({
    nombre_clase: String,
    materia: String
    //alumnos:{ type: mongoose.Schema.ObjectId, ref: "Alumnos"}, 
     
    
});


module.exports= mongoose.model('Clases',ClasesSchema);





