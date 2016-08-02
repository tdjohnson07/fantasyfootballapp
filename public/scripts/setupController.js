angular.module('fantasyApp').controller('setupController',['$http', '$location', 'DataService', function($http, $location, DataService){
  var vm = this;
  vm.numOfTeams = [6,7,8,9,10,11,12,13,14,15,16];
  vm.numOfRounds = [10,11,12,13,14,15,16,17,18,19,20];
  vm.setTeams =[];
  vm.idp=false;
  vm.selectedRounds= 0;
  vm.randomize=false;
  vm.getNum = function(){
    console.log(vm.selectedNum);
    for (var i=0; i<vm.selectedNum; i++){
      vm.setTeams.push("team"+(i+1));
    }
    console.log(vm.setTeams);
  }
  vm.confirm = function(){
    console.log(vm.setTeams);
    console.log(vm.idp);
    console.log(vm.selectedRounds);
    console.log(vm.randomize);
    console.log(DataService.data.draftType);
  }
  vm.start = function(){
    DataService.data.setTeams= vm.setTeams;
    DataService.data.idp=vm.idp;
    DataService.data.selectedRounds=vm.selectedRounds;
    DataService.data.randomize=vm.randomize;
    $location.path('/auctionDraft');
  }
}]);
