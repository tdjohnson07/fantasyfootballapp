angular.module('fantasyApp').controller('setupController',['$location', 'DataService', function($location, DataService){
  var vm = this;
  vm.numOfTeams = [6,7,8,9,10,11,12,13,14,15,16];
  vm.numOfRounds = [10,11,12,13,14,15,16,17,18,19,20];
  vm.timeSelections=["1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00"];
  vm.setTeams =[];
  vm.idp=false;
  vm.selectedRounds= 0;
  vm.randomize=false;
  if(DataService.data.draftType === "auction"){
      vm.auctionTrue = true;
  }
  vm.getNum = function(){
    console.log(vm.selectedNum);
    for (var i=0; i<vm.selectedNum; i++){
      vm.setTeams.push("team"+(i+1));
    }
    console.log(vm.setTeams);
  }
  vm.start = function(){
    DataService.data.setTeams= vm.setTeams;
    DataService.data.idp=vm.idp;
    DataService.data.selectedRounds=vm.selectedRounds;
    DataService.data.randomize=vm.randomize;
    DataService.data.draftName = vm.draftName;
    if(vm.setTeams.length === 0){
      vm.getNum();
    }
    if(DataService.data.draftType === "auction"){
      DataService.data.cash=vm.cash;
        DataService.setTeamInfo();
      $location.path('/auction');
    }
    else if(DataService.data.draftType === "snake"){
      DataService.data.pickTime = DataService.convertTime(vm.pickTime);
        DataService.setTeamInfo();
      $location.path('/snake');
    }
  }
  DataService.sortPlayers();
}]);
