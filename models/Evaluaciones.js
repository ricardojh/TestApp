var mongoose =require('mongoose');


var User =mongoose.model('User');

var EvaluacionesSchema= new mongoose.Schema({

  //userId: { type: mongoose.Schema.ObjectId, ref: "User"},
        userId:String,
        claseId:String,
        nombre_eva: String,
        fecha: Date,
        cant_preguntas: Number,
        opciones: Number,
        respuestas:[]
    //alumnos:{ type: mongoose.Schema.ObjectId, ref: "Alumnos"},

});


module.exports= mongoose.model('Evaluaciones',EvaluacionesSchema);
