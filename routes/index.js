var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
//var prueba = require('/users');
//var User = mongoose.model('User');
var User = require('../models/User');
var UserCtrl= require('../controller/objetoCtrl');
var Clases= mongoose.model('Clases');
var Alumnos= mongoose.model('Alumnos');
var Evaluaciones= mongoose.model('Evaluaciones');
var userIdGlobal;
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}





//-------------------METODOS DEL MODELO CLASES----------------------------------
//metodo get  listar clases
router.get('/clases',function(req, res, next){

userIdGlobal = UserCtrl.getUserId();
//console.log(globalString);
globalString=userIdGlobal;



  Clases.find({userId:globalString}, function(err, clases){
    if(err){
      return next(err)
    }

    res.json(clases)
  })


});

//metodo post insertar clases
router.post('/clase', function(req, res, next){
  var clase= new Clases(req.body);
	//req.body.userId=globalString;
	//claseIdGlobal=clase._id;
	clase.userId=globalString;
	//console.log(claseIdGlobal);
  clase.save(function(err, clase){
    if (err) {
      return next(err)
    }
    res.json(clase);
  })
});


//metodo put clases
router.put('/clase/:id',function(req, res, next){
  Clases.findById(req.params.id, function(err, clase){
    clase.nombre_clase=req.body.nombre_clase;
    clase.materia=req.body.materia;
    clase.save(function(err){
      if (err) {
        res.send(err)
      }
      res.json(clase);
    })
    })
});

//metodo delete clases
router.delete('/clase/:id',function(req, res){
  Clases.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.send(err)
    }
    res.json({message:'La clase se ha eliminado' });
  })
});

router.post('/view1', function(req, res) {
    console.log(req.body._id);
		globalClaseId=req.body._id;
    //res.end();
});



//--------------------------------------------------------------METODOS DEL MODELO ALUMNOS--------------------------------------------------------------
//metodo get  listar alumnos
router.get('/cont_class/alumnos',function(req, res, next){


	Alumnos.find({claseId:globalClaseId}, function(err, alumnos){

    if(err){
      return next(err)
    }

    res.json(alumnos)
  })
});

//metodo post insertar alumnos
router.post('/cont_class/alumno', function(req, res, next){
  var alumno= new Alumnos(req.body);
  alumno.userId=globalString;
  alumno.save(function(err, alumno){
    if (err) {
      return next(err)
    }
    res.json(alumno);
  })
});


//metodo put alumnos
router.put('/cont_class/alumno/:id',function(req, res, next){
  Alumnos.findById(req.params.id, function(err, alumno){
    alumno.nombre=req.body.nombre;
    alumno.apellido=req.body.apellido;
    alumno.notas=req.body.notas;
    //alumno.evaluaciones=req.body.evaluaciones;
    alumno.save(function(err){
      if (err) {
        res.send(err)
      }
      res.json(alumno);
    })
    })
});

//metodo delete alumnos
router.delete('/cont_class/alumno/:id',function(req, res){
  Alumnos.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.send(err)
    }
    res.json({message:'El alumno se ha eliminado' });
  })
});

//--------------------------------------------------------------METODOS DEL MODELO EVALUACIONES-----------------------------------------------------------------------
//metodgo get evaluciones
router.get('/cont_class/evaluaciones',function(req, res, next){
  Evaluaciones.find({claseId:globalClaseId}, function(err, evaluaciones){
    if(err){
      return next(err)
    }

    res.json(evaluaciones)
  })


});

//metodo post insertar evaluacion
router.post('/cont_class/evaluacion', function(req, res, next){
  var evaluacion= new Evaluaciones(req.body);
evaluacion.userId=globalString;
  evaluacion.save(function(err, evaluacion){
    if (err) {
      return next(err)
    }
    res.json(evaluacion);
  })
});


//metodo put evaluacion
router.put('/cont_class/evaluacion/:id',function(req, res, next){
  Evaluaciones.findById(req.params.id, function(err, evaluacion){
    evaluacion.nombre_eva=req.body.nombre_eva;
    evaluacion.fecha=req.body.fecha;
    evaluacion.cant_preguntas=req.body.cant_preguntas;
    evaluacion.cant_preguntas=req.body.opciones;
    evaluacion.respuetas=req.body.respuetas;
    evaluacion.save(function(err){
      if (err) {
        res.send(err)
      }
      res.json(evaluacion);
    })
    })
});

//metodo delete clases
router.delete('/cont_class/evaluacion/:id',function(req, res){
  Evaluaciones.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.send(err)
    }
    res.json({message:'La evaluacion se ha eliminado' });
  })
});
module.exports = router;
