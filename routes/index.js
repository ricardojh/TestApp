var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose=require('mongoose');

var Clases=mongoose.model('Clases');
var Alumnos=mongoose.model('Alumnos');
var Evaluaciones=mongoose.model('Evaluaciones');



//--------------------------------------------------------------METODOS DEL MODELO CLASES--------------------------------------------------------------
//metodo get  listar clases
router.get('/clases',function(req, res, next){
  Clases.find(function(err, clases){
    if(err){
      return next(err)
    }

    res.json(clases)
  })


});

//metodo post insertar clases
router.post('/clase', function(req, res, next){
  var clase= new Clases(req.body);

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




//--------------------------------------------------------------METODOS DEL MODELO ALUMNOS--------------------------------------------------------------
//metodo get  listar alumnos
router.get('/alumnos',function(req, res, next){
  Alumnos.find(function(err, alumnos){
    if(err){
      return next(err)
    }

    res.json(alumnos)
  })
});

//metodo post insertar alumnos
router.post('/alumno', function(req, res, next){
  var alumno= new Alumnos(req.body);

  alumno.save(function(err, alumno){
    if (err) {
      return next(err)
    }
    res.json(alumno);
  })
});


//metodo put alumnos
router.put('/alumno/:id',function(req, res, next){
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
router.delete('/alumno/:id',function(req, res){
  Alumnos.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.send(err)
    }
    res.json({message:'El alumno se ha eliminado' });
  })
});

//--------------------------------------------------------------METODOS DEL MODELO EVALUACIONES-----------------------------------------------------------------------
//metodgo get evaluciones
router.get('/evaluaciones',function(req, res, next){
  Evaluaciones.find(function(err, evaluaciones){
    if(err){
      return next(err)
    }

    res.json(evaluaciones)
  })


});

//metodo post insertar evaluacion
router.post('/evaluacion', function(req, res, next){
  var evaluacion= new Evaluaciones(req.body);

  evaluacion.save(function(err, evaluacion){
    if (err) {
      return next(err)
    }
    res.json(evaluacion);
  })
});


//metodo put evaluacion
router.put('/evaluacion/:id',function(req, res, next){
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
router.delete('/evaluacion/:id',function(req, res){
  Evaluaciones.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.send(err)
    }
    res.json({message:'La evaluacion se ha eliminado' });
  })
});
module.exports = router;
