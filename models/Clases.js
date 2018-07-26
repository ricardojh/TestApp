var mongoose =require('mongoose');

//var Schema = mongoose.Schema;
//var Alumnos =mongoose.model('Alumnos');
var User =mongoose.model('User');

var ClasesSchema= new mongoose.Schema({
  //userId: { type: mongoose.Schema.ObjectId, ref: "User"},
    userId:String,
    nombre_clase: String,
    materia: String
    //alumnos:{ type: mongoose.Schema.ObjectId, ref: "Alumnos"},


});


module.exports= mongoose.model('Clases',ClasesSchema);
