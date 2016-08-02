angular.module('fantasyApp').controller('homeController', ['$http','$location', 'DataService', function($http,$location, DataService){
  var vm = this;
  vm.data = DataService.data;
  vm.auction = function(){
    DataService.data.draftType="auction";
    $location.path('/setup');
  }
  vm.snake = function(){
    DataService.data.draftType="snake";
    $location.path('/setup');
  }
  vm.viewPrevious = function(){
    $location.path('/prevSelect');
  }
}]);
