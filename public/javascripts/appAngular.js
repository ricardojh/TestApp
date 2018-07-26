//var objeto = require s('../../controller/objetoCtrl');
var claseIdGlobal;
angular.module('appTestApp', ['ui.router'])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('class', {
                url: '/class',
                templateUrl: 'views/class.html',
                controller: 'ctrlClass'
            })
        $stateProvider
            .state('config', {
                url: '/config',
                templateUrl: 'views/config.html'
            })
        $stateProvider
            .state('events', {
                url: '/events',
                templateUrl: 'views/events.html'
            })

         $stateProvider
            .state('cont_class', {
                url: '/cont_class',
                templateUrl: 'views/cont_class.html',
                controller: 'ctrlContClase'
            })
            .state('cont_class.alumnos', {
                url: '/alumnos',
                templateUrl: 'views/alumnos.html',
                controller: 'ctrlAlumnos'
            })
            .state('cont_class.report', {
                url: '/report',
                templateUrl: 'views/report.html',
                controller: 'ctrlClass'
            })
            .state('cont_class.evaluaciones', {
                url: '/evaluaciones',
                templateUrl: 'views/evaluaciones.html',
                controller: 'ctrlEvaluaciones'
            })

            /*
              $stateProvider
            .state('evaluaciones', {
                url: '/evaluaciones',
                templateUrl: 'views/evaluaciones.html',
                controller: 'ctrlEvaluaciones'
            })

            $stateProvider
            .state('alumnos', {
                url: '/alumnos',
                templateUrl: 'views/alumnos.html',
                controller: 'ctrlAlumnos'
            })


            $stateProvider
            .state('report', {
                url: '/report',
                templateUrl: 'views/report.html',
                controller: 'ctrlAlumnos'
            })


        $stateProvider
            .state('upnotes', {
                url: '/upnotes',
                templateUrl: 'views/upnotes.html'
            })
            */
            $stateProvider
                .state('test', {
                    url: '/test',
                    templateUrl: 'views/test.html'
                })

        $stateProvider
            .state('new_class', {
                url: '/new_class',
                templateUrl: 'views/new_class.html',
                controller: 'ctrlClass'

            })
        $stateProvider
            .state('editar_class', {
                url: '/editar_class',
                templateUrl: 'views/editar_class.html',
                controller: 'ctrlEditarClase'

            })
            $stateProvider
            .state('editar_evaluaciones', {
                url: '/editar_evaluaciones',
                templateUrl: 'views/editar_evaluaciones.html',
                controller: 'ctrlEditarEvaluaciones'

            })
            $stateProvider
            .state('editar_alumno', {
                url: '/editar_alumno',
                templateUrl: 'views/editar_alumno.html',
                controller: 'ctrlEditarAlumno'

            })
            $stateProvider
            .state('respuestas', {
                url: '/respuestas',
                templateUrl: 'views/respuestas.html',
                controller: 'ctrlEvaluaciones'

            })

        $urlRouterProvider.otherwise('test');
    })
    //--------------------------------------------------------------FACTORY COMUN PARA LAS CLASES--------------------------------------------------------------
    .factory('comun', function ($http) {
        var comun = {};
        comun.clases = [];
        comun.clase = {};

        //METODOS PARA OBTENER LOS DATOS DE MONGO
        //METODO GET TODOS
        comun.getAll = function () {
            $http({
                method: 'GET',
                url: '/clases'
            }).then(function successCallback(response) {
                //comun.tareas=response.data;
                console.log("Success", response);
                angular.copy(response.data, comun.clases)
                return comun.clases

            }, function errorCallback(response) {
                console.log("Error Countries", response)
            });
        }
        //METODO ADD
        comun.add = function (clase) {
            return $http.post('/clase', clase)
                .then(function (clase) {
                    comun.clases.push(clase);
                    comun.getAll();

                })
        }
        //METODO UPDATE
        comun.update = function (clase) {
            return $http.put('/clase/' + clase._id, clase)
                .then(function (data) {
                    var indice = comun.clases.indexOf(clase);
                    comun.clases[indice] = data;
                })
        }
        //METODO DELETE
        comun.delete = function (clase) {
            return $http.delete('/clase/' + clase._id)
                .then(function () {
                    var indice = comun.clases.indexOf(clase);
                    comun.clases.slice(indice, 1);
                    console.log("Eliminacion Correcta");
                })
        }

        comun.sub = function($scope){
          $http.post('/view1',$scope.clase).
        then(function(response) {
            console.log("posted successfully");
        }).catch(function(response) {
            console.error("error in posting");
        })
        }
        return comun;
    })

    //--------------------------------------------------------------FACTORY COMUN PARA LOS ALUMNOS--------------------------------------------------------------
    .factory('comun2', function ($http) {
        var comun2 = {};
        comun2.alumnos = [];


        //METODOS PARA OBTENER LOS DATOS DE MONGO
        //METODO GET TODOS
        comun2.getAlumnos = function () {
            $http({
                method: 'GET',
                url: '/cont_class/alumnos'
            }).then(function successCallback(response) {
                //comun.tareas=response.data;
                console.log("Success", response);
                angular.copy(response.data, comun2.alumnos)
                return comun2.alumnos

            }, function errorCallback(response) {
                console.log("Error Countries", response)
            });
        }
        //METODO ADD
        comun2.add = function (alumno) {
            return $http.post('/cont_class/alumno', alumno)
                .then(function (alumno) {
                    comun2.alumnos.push(alumno);
                    comun2.getAlumnos();
                })
        }
        //METODO UPDATE
        comun2.update = function (alumno) {
            return $http.put('/cont_class/alumno/' + alumno._id, alumno)
                .then(function (data) {
                    var indice = comun2.alumnos.indexOf(alumno);
                    comun2.alumnos[indice] = data;
                })
        }
        //METODO DELETE
        comun2.delete = function (alumno) {
            return $http.delete('/cont_class/alumno/' + alumno._id)
                .then(function () {
                    var indice = comun2.alumnos.indexOf(alumno);
                    comun2.alumnos.slice(indice, 1);
                    console.log("Eliminacion Correcta");
                })
        }
        comun2.getPromedio =function(alumno){
            let values = alumno.notas;
                        let count = values.length;
                        values = values.reduce((previous, current) => current += previous);
                        values /= count;
                        console.log(alumno.notas);
                        console.log(values);
        }
        return comun2;
    })

    //--------------------------------------------------------------FACTORY COMUN PARA LOS EVALUACION--------------------------------------------------------------

    .factory('comun3', function ($http) {
        var comun3 = {}
        comun3.evaluaciones = [];
        comun3.evaluacion = {};


        //METODO GET TODOS
        comun3.getEvaluaciones = function () {
            $http({
                method: 'GET',
                url: '/cont_class/evaluaciones'
            }).then(function successCallback(response) {
                //comun.tareas=response.data;
                console.log("Success", response);
                angular.copy(response.data, comun3.evaluaciones)
                return comun3.evaluaciones

            }, function errorCallback(response) {
                console.log("Error Countries", response)
            });

        }
        //METODO ADD
        comun3.add = function (evaluacion) {
            return $http.post('/cont_class/evaluacion', evaluacion)
                .then(function (evaluacion) {
                    comun3.evaluaciones.push(evaluacion);
                    comun3.getEvaluaciones();
                })
        }
        //METODO UPDATE
        comun3.update = function (evaluacion) {
            return $http.put('/cont_class/evaluacion/' + evaluacion._id, evaluacion)
                .then(function (data) {
                    var indice = comun3.evaluaciones.indexOf(evaluacion);
                    comun3.evaluaciones[indice] = data;
                })
        }
        //METODO DELETE
        comun3.delete = function (evaluacion) {
            return $http.delete('/cont_class/evaluacion/' + evaluacion._id)
                .then(function () {
                    var indice = comun3.evaluaciones.indexOf(evaluacion);
                    comun3.evaluaciones.slice(indice, 1);
                    console.log("Eliminacion Correcta");
                })
        }


        return comun3;
    })


    // ---------------------------------------------------------------CONTROLADOR DE LA CLASE--------------------------------------------------------------------------
    .controller('ctrlClass', function ($scope, $state, comun) {
        $scope.clase = {}
        comun.getAll();
        $scope.clases = comun.clases;
        //METDO AGREGAR CLASES
        $scope.agregar = function () {
            comun.add({
                nombre_clase: $scope.clase.nombre_clase,
                materia: $scope.clase.materia
            })
            $scope.clase.nombre_clase = '';
            $scope.clase.materia = '';
            $state.go('class');
        }
        //METODO ELIMINAR CLASE
        $scope.eliminar = function (clase) {
            comun.delete(clase);
            comun.getAll();
            $state.go('class');
        }

        //METODO ACTUALIZAR CLASE
        $scope.procesaObjeto = function (clase) {
            comun.clase = clase;
            $state.go('editar_class');
        }
        //METODO PASA HACER CLICK
        $scope.procesaObjetoClase = function (clase) {
            comun.clase = clase;
            $state.go('cont_class');
        }
    })

    //-------------------------------------------------------------------------------CONTROLADOR EDITAR CLASE-------------------------------------------------------------------
    .controller('ctrlEditarClase', function ($scope, $state, comun) {
        $scope.clase = comun.clase;

        console.log('id clase guardada: '+ claseIdGlobal);
        $scope.actualizar = function () {
            comun.update($scope.clase);
            $state.go('class');
        }

        $scope.eliminar = function () {
            comun.delete($scope.clase);
            $state.go('class');
        }
    })
    //-------------------------------------------------------------------------------CONTROLADOR CONTENEDOR CLASE-------------------------------------------------------------------
    .controller('ctrlContClase', function ($scope, $state, comun) {
        $scope.clase = comun.clase;
        console.log($scope.clase._id);
        claseIdGlobal=$scope.clase._id;
        console.log('id clase guardada: '+ claseIdGlobal);

        comun.sub($scope);
    })


    //---------------------------------------------------------------------------CONTROLADOR DE LOS ALUMNOS---------------------------------------------------------------------------
    .controller('ctrlAlumnos', function ($scope, $state, comun2) {
        $scope.alumno = {};
        comun2.getAlumnos();

        $scope.alumnos = comun2.alumnos;
        //METDO AGREGAR CLASES
        $scope.agregar = function () {
          console.log($scope.alumno.claseId);
            comun2.add({
                claseId:claseIdGlobal,
                nombre: $scope.alumno.nombre,
                apellido: $scope.alumno.apellido,
                notas: $scope.alumno.notas

            })
            $scope.alumno.nombre = '';
            $scope.alumno.apellido = '';
            $scope.alumno.notas=' ';
            $state.go('alumnos');
        }
        //METODO ELIMINAR CLASE
        $scope.eliminar = function (alumno) {
            comun2.delete(alumno);
            comun2.getAlumnos();
            $state.go('alumnos');
        }

        //METODO ACTUALIZAR CLASE
        $scope.procesaObjeto = function (alumno) {
            comun2.alumno = alumno;
            $state.go('editar_alumno');
        }

        $scope.getPromedio =function(alumno){
            console.log(alumno.notas);
            let values = alumno.notas;
                        let count = values.length;
                        values = values.reduce((previous, current) => current += previous);
                        values /= count;
                        console.log(alumno.notas);
                        console.log(values);
        }

    })

    //-------------------------------------------------------------------------------CONTROLADOR EDITAR ALUMNOS-------------------------------------------------------------------
    .controller('ctrlEditarAlumno', function ($scope, $state, comun2) {
        $scope.alumno = comun2.alumno;

        $scope.actualizar = function () {
            comun2.update($scope.alumno);
            $state.go('alumnos');
        }

        $scope.eliminar = function () {
            comun2.delete($scope.alumno);
            $state.go('alumnos');
        }
    })


    //---------------------------------------------------------------------------CONTROLADOR DE LAS EVALUACIONES---------------------------------------------------------------------------
    .controller('ctrlEvaluaciones', function ($scope, $state, $window, comun3) {

        $scope.evaluacion = {};
        comun3.getEvaluaciones();

        $scope.evaluaciones = comun3.evaluaciones;

        //METDO AGREGAR CLASES

        $scope.agregar = function () {
            var div = parent.document.getElementById($scope.clase);
                      console.log(div);
            var cadena = $scope.evaluacion.respuestas;
             separador = " ", // un espacio en blanco
            arregloDeSubCadenas = cadena.split(separador);

            console.log(arregloDeSubCadenas);


            comun3.add({
                //claseId:$scope.clase,
                claseId:claseIdGlobal,
                nombre_eva: $scope.evaluacion.nombre_eva,
                fecha: $scope.evaluacion.fecha,
                cant_preguntas: $scope.evaluacion.cant_preguntas,
                opciones: $scope.evaluacion.opciones,
                respuestas: arregloDeSubCadenas
            })

            $state.go('evaluaciones');
        }

        $scope. agregarRespuestas = function () {
            var cadena = $scope.evaluacion.respuestas;
             separador = " ", // un espacio en blanco
            arregloDeSubCadenas = cadena.split(separador);

            console.log(arregloDeSubCadenas);

            comun3.add({
                respuestas: arregloDeSubCadenas
            })

            $state.go('evaluaciones');
        }

        $scope.GetRowIndex = function (index) {
            $window.alert("Row Index: " + index);
        };
        //METODO ELIMINAR EVALUACION
        $scope.eliminar = function (evaluacion) {
            comun3.delete(evaluacion);
            comun3.getEvaluaciones();
            $state.go('evaluaciones');
        }

        //METODO ACTUALIZAR EVALUACION



       /*  $scope.procesaObjeto = function (evaluacion) {
            comun3.evaluacion = evaluacion;
            $state.go('editar_evaluaciones');
        } */

        $scope.procesaObjeto = function (evaluacion) {
            comun3.evaluacion = evaluacion;
            $state.go('editar_evaluaciones');
        }
    })


    //-------------------------------------------------------------------------------CONTROLADOR EDITAR EVALUACION-------------------------------------------------------------------
   .controller('ctrlEditarEvaluaciones', function ($scope, $state, comun3) {
        $scope.evaluacion = comun3.evaluacion;

        $scope.actualizarEvaluacion = function () {
            comun3.update($scope.evaluacion);
            $state.go('evaluaciones');
        }

        $scope.eliminar = function () {
            comun3.delete($scope.evaluacion);
            $state.go('evaluaciones');
        }
    })
