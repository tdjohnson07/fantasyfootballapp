angular.module('fantasyApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/',{
      templateUrl: '/views/login.html',
      controller: 'loginController',
      controllerAs: 'login'
    })
    .when('/register',{
      templateUrl: '/views/register.html',
      controller: 'registerController',
      controllerAs: 'register'
    })
    .when('/home',{
      templateUrl: '/views/home.html',
      controller: 'homeController',
      controllerAs: 'home'
    })
    .when('/setup',{
      templateUrl: '/views/setup.html',
      controller: 'setupController',
      controllerAs: 'setup'
    })
    .when('/prevSelect',{
      templateUrl: '/views/previousdraftselect.html',
      controller: 'previousdraftselectController',
      controllerAs: 'prevSel'
    })
    .when('/auction',{
      templateUrl: '/views/auctiondraft.html',
      controller: 'auctiondraftController',
      controllerAs: 'auction',
      // css: '/styles/style.css'
    })
    .when('/snake', {
      templateUrl: '/views/snake.html',
      controller: 'snakedraftController',
      controllerAs: 'snake'
    })
    .when('/draftview',{
      templateUrl: '/views/previousdraftview.html',
      controller: 'previousdraftviewController',
      controllerAs: 'prevView'
    })
    .when('/individual',{
      templateUrl: '/views/indisetup.html',
      controller: 'indisetupController',
      controllerAs: 'isu'
    })
    .when('/indidraft',{
      templateUrl: '/views/indidraft.html',
      controller: 'indidraftController',
      controllerAs: 'indi'
    })
    $locationProvider.html5Mode(true);
}]);
