var mongoose =require('mongoose');
//Svar Schema = mongoose.Schema;
var Clases =mongoose.model('Clases');
 
var AlumnosSchema= new mongoose.Schema({

        claseId: { type: mongoose.Schema.ObjectId, ref: "Clases"},
        nombre: String,
        apellido: String,
        notas: []
});

module.exports = mongoose.model('Alumnos', AlumnosSchema);