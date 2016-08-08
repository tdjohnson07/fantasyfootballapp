angular.module('fantasyApp').controller('snakedraftController',['$location', 'DataService', function($location, DataService){
  console.log(DataService.data);
  var vm = this;
  vm.data = DataService.data;
  vm.positions=['QB','RB', 'WR', 'TE', 'K', 'DEF', 'ALL'];
  vm.displayList=[];
  vm.selectedPlayer={};
  var selectedTeamIndex = 0;
  vm.selectedTeam= vm.data.draftOrder[selectedTeamIndex];
  vm.onDeck = vm.data.draftOrder[selectedTeamIndex+1];
  vm.inTheHole = vm.data.draftOrder[selectedTeamIndex+2];
  vm.displayMessage= "Have Fun Drafting";
  vm.endList=false;
  vm.startList=true;
  vm.playerSelected = false;
  var currentDisplay=vm.data.players;
  var displayIndex =0;
  function getDisplayList(playerArray, index){
    for(var i=0; i<10; i++, index++){
      if(index >= playerArray.length-1){
        vm.startList=false;
      }
      if(index<= 0){
        vm.endList=false;
      }
      vm.displayList[i]=playerArray[index];
    }
  }
  vm.nextDisplay = function(){
    vm.endList=true;
    displayIndex+=10;
    getDisplayList(currentDisplay, displayIndex);
  }
  vm.prevDisplay = function(){
    vm.startList=true;
    displayIndex-=10;
    getDisplayList(currentDisplay, displayIndex);
  }
  vm.narrow = function(position){
    displayIndex=0;
    var playerArray=DataService.locateArray(position);
    currentDisplay=playerArray;
    getDisplayList(playerArray, displayIndex);
  }
  vm.selectPlayer = function(player){
    console.log(player);
    vm.playerSelected = true;
    vm.selectedPlayer=player;
  }
  vm.draft = function(){
    var index=DataService.findTeamInfo(vm.selectedTeam);
    if(!vm.playerSelected){
      vm.displayMessage = "No player Selected";
      return;
    }
    if(vm.data.teamInfo[index].teamList.length >= parseInt(vm.data.selectedRounds)){
      vm.displayMessage = "Roster Full";
      return;
    }
    vm.data.teamInfo[index].teamList.push(vm.selectedPlayer);
    var location = vm.data.players.indexOf(vm.selectedPlayer);
    var playerArray=DataService.locateArray(vm.selectedPlayer.position);
    var locationTwo = playerArray.indexOf(vm.selectedPlayer);
    vm.data.players.splice(location, 1);
    DataService.locateArray(vm.selectedPlayer.position).splice(locationTwo, 1);
    getDisplayList(currentDisplay, displayIndex);
    vm.playerSelected=false;
    vm.displayMessage = vm.selectedPlayer.displayname + " added to " + vm.data.teamInfo[index].teamName;
    vm.selectedPlayer = {};
    selectedTeamIndex++;
    if(selectedTeamIndex >= vm.data.draftOrder.length){
      vm.displayMessage= "Draft Complete";
    }
    vm.selectedTeam = vm.data.draftOrder[selectedTeamIndex];
    vm.onDeck = vm.data.draftOrder[selectedTeamIndex+1];
    vm.inTheHole = vm.data.draftOrder[selectedTeamIndex+2];
    console.log(location, locationTwo);

  }
  console.log(vm.data.teamInfo);
  getDisplayList(vm.data.players, displayIndex);
}]);
