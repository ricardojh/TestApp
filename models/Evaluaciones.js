var mongoose =require('mongoose');


var Clases =mongoose.model('Clases');

var EvaluacionesSchema= new mongoose.Schema({

    claseId: { type: mongoose.Schema.ObjectId, ref: "Clases"},
        nombre_eva: String,
        fecha: Date,
        cant_preguntas: Number,
        opciones: Number,
        respuestas:[]
    //alumnos:{ type: mongoose.Schema.ObjectId, ref: "Alumnos"}, 
    
});


module.exports= mongoose.model('Evaluaciones',EvaluacionesSchema);

