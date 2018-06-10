angular.module('appTestApp',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
        .state('class',{
            url: '/class',
            templateUrl: 'views/class.html',
            controller:'ctrlClass'
        })
        $stateProvider
        .state('config',{
            url: '/config',
            templateUrl: 'views/config.html'
        })
        $stateProvider
        .state('events',{
            url: '/events',
            templateUrl: 'views/events.html'
        })
      
        $stateProvider
        .state('cont_class',{
            url: '/cont_class',
            templateUrl: 'views/cont_class.html',
            controller:'ctrlClass'
        })
        .state('cont_class.students',{
            url: '/students',
            templateUrl: 'views/students.html',
            controller: 'ctrlAlumnos'
        })
        .state('cont_class.report',{
            url: '/report',
            templateUrl: 'views/report.html',
            controller:'ctrlClass'
        })
        $stateProvider
        .state('test',{
            url: '/test',
            templateUrl: 'views/test.html'
        })
        $stateProvider
        .state('upnotes',{
            url: '/upnotes',
            templateUrl: 'views/upnotes.html'
        })
        $stateProvider
        .state('new_class',{
            url: '/new_class',
            templateUrl: 'views/new_class.html',
            controller:'ctrlClass'
        
        })
       
 
        $urlRouterProvider.otherwise('test');
    })

.factory('comun', function($http){
    var comun={};
    comun.clases=[];
    comun.clase={};
    
    //metodos para obtener los datos desede mongo
    comun.getAll=function(){
        $http({
          method: 'GET',
            url: '/clases'
        }).then(function successCallback(response){
          //comun.tareas=response.data;
          console.log("Success", response);
          angular.copy(response.data, comun.clases)
          return comun.clases
  
        }, function errorCallback(response){
          console.log("Error Countries",response)
        });
      }





    return comun;
})
.factory('comun2', function(){
    var comun2={}
    comun2.alumnos=[{
        nombre: 'Ricardo',
        apellido: 'Jumbo'
    },{
        nombre: 'Maria',
        apellido: 'Jimenez'
    },{
        nombre: 'Luis',
        apellido: 'Chamba'
    }];
    return comun2;
})



.controller('ctrlClass',function($scope,$state,comun){
    $scope.clase={}
    comun.getAll();
    $scope.clases=comun.clases;

    $scope.agregar=function(){
        $scope.clases.push({
          nombre: $scope.clase.nombre,
          materia: $scope.clase.materia
        })
        $state.go('class');
      }
})

.controller('ctrlAlumnos',function($scope,$state,comun2){
    $scope.alumno={}
    $scope.alumnos=comun2.alumnos;
    $scope.agregar=function(){
        $scope.alumnos.push({
          nombre: $scope.alumno.nombre,
          apellido: $scope.alumno.apellido
        })
        $scope.alumno.nombre='';
        $scope.alumno.apellido='';
        $state.go('students');
      }
})
