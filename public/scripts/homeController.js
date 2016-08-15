angular.module('fantasyApp').controller('homeController', ['$http','$location', 'DataService', function($http,$location, DataService){
  var vm = this;
  vm.data = DataService.data;
  DataService.data.teamInfo=[];
  DataService.data.setTeams=[];
  DataService.emptyArrays();
  vm.auction = function(){
    DataService.data.draftType="auction";
    // DataService.data.loggedIn = true;
    $location.path('/setup');
  }
  vm.snake = function(){
    DataService.data.draftType="snake";
    // DataService.data.loggedIn = true;
    $location.path('/setup');
  }
  vm.viewPrevious = function(){
    DataService.getDrafts();
    // DataService.data.loggedIn = true;
    $location.path('/prevSelect');
  }
}]);
