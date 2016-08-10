angular.module('fantasyApp').controller('previousdraftviewController',['$http', 'DataService', function($http, DataService){
  var vm = this;
  vm.data = DataService.data;
  
}]);
