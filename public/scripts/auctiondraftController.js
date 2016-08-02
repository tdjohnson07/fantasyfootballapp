angular.module('fantasyApp').controller('auctiondraftController',['$location', 'DataService', function($location, DataService){
  console.log(DataService.data);
  var vm = this;
  vm.data = DataService.data;
  console.log();
}]);
