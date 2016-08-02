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
      templateUrl: '/views/auctionDraft.html',
      controller: 'auctiondraftController',
      controllerAs: 'auction',
      css: '/styles/style.css'
    })
    .when('/snake', {
      templateUrl: '/views/snakedraft.html',
      controller: 'snakedraftController',
      controllerAs: 'snake'
    })
    $locationProvider.html5Mode(true);
}]);
