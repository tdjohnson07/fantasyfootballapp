angular.module('fantasyApp').controller('setupController',['$location', 'DataService', function($location, DataService){
  var vm = this;
  vm.numOfTeams = [6,7,8,9,10,11,12,13,14,15,16];
  vm.numOfRounds = [10,11,12,13,14,15,16,17,18,19,20];
  vm.timeSelections=["1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00"];
  vm.setTeams =[];
  vm.idp=false;
  vm.selectedRounds= 0;
  vm.randomize=false;
  vm.display=false;
  vm.teamsset=true;
  if(DataService.data.draftType === "auction"){
      vm.auctionTrue = true;
  }
  vm.getNum = function(){
    if(vm.selectedNum>0){
      for (var i=0; i<vm.selectedNum; i++){
        vm.setTeams.push("team"+(i+1));
      }
      vm.teamsset=false;

    }
  }
  vm.start = function(){
    // DataService.sortPlayers(DataService.data.ranked);
    // DataService.sortDef(DataService.data.players);
    DataService.data.setTeams= vm.setTeams;
    DataService.data.idp=vm.idp;
    DataService.data.selectedRounds=vm.selectedRounds;
    DataService.data.randomize=vm.randomize;
    DataService.data.draftName = vm.draftName;
    if(vm.setTeams.length === 0){
      vm.getNum();
    }
    if(vm.selectedNum== undefined){
      vm.display= true;
      vm.displayMessage = "Please Select Number of teams";
      return;
    }
    if(!vm.draftName){
      vm.display= true;
      vm.displayMessage = "Please Enter a name for your draft";
      return;
    }
    if(vm.selectedRounds===0){
      vm.display = true;
      vm.displayMessage = "Please Select Number of Rounds";
      return;
    }
    if(vm.randomize){
      DataService.data.setTeams = DataService.randomize(DataService.data.setTeams);
    }
    if(DataService.data.draftType === "auction"){
      DataService.data.cash=vm.cash;
      if(vm.cash == undefined){
        vm.display = true;
        vm.displayMessage = "Please Enter Starting Cash for each Team";
        return;
      }
      DataService.sortPlayers(DataService.data.ranked);
      DataService.sortDef(DataService.data.players);
      DataService.setTeamInfo();
      $location.path('/auction');
    }
    else if(DataService.data.draftType === "snake"){
      DataService.sortPlayers(DataService.data.ranked);
      DataService.sortDef(DataService.data.players);
      DataService.data.pickTime = DataService.convertTime(vm.pickTime);
      DataService.setTeamInfo();
      DataService.setDraftOrder(vm.setTeams, vm.selectedRounds);
      if(vm.selectedRounds%2===0){
        vm.setTeams.reverse();
      }
      $location.path('/snake');
    }
  }
  DataService.getPlayers();
  DataService.getRankedPlayers();
}]);
