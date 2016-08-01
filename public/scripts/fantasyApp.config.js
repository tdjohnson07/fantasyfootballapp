angular.module('fantasyApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/',{
      templateUrl: '/views/login.html',
      controller: 'loginController',
      ControllerAs: 'login'
    })
    .when('/register',{
      templateUrl: '/views/register.html',
      controller: 'registerController',
      ControllerAs: 'register'
    })
    $locationProvider.html5Mode(true);
}]);
