var mongoose =require('mongoose');
//Svar Schema = mongoose.Schema;
var User =mongoose.model('User');

var AlumnosSchema= new mongoose.Schema({

        userId: String,
        claseId:String,
        nombre: String,
        apellido: String,
        notas: []
});

module.exports = mongoose.model('Alumnos', AlumnosSchema);
