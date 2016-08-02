angular.module('fantasyApp').controller('auctiondraftController',['$location', 'DataService', function($location, DataService){
  console.log(DataService.data);
  var vm = this;
  vm.data = DataService.data;
  vm.teaminfo=[];
  for (var i=0; i<vm.data.setTeams.length; i++){
    var team ={};
    team.teamName = vm.data.setTeams[i];
    team.cash = vm.data.cash;
    vm.teaminfo.push(team);
  }
  console.log(vm.teaminfo);
}]);
