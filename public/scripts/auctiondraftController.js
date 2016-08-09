angular.module('fantasyApp').controller('auctiondraftController',['$location', 'DataService', function($location, DataService){
  console.log(DataService.data);
  var vm = this;
  vm.data = DataService.data;
  vm.positions=['QB','RB', 'WR', 'TE', 'K', 'DEF', 'ALL'];
  vm.displayList=[];
  vm.selectedPlayer={};
  vm.displayMessage= "Have Fun Drafting";
  vm.endList=false;
  vm.startList=true;
  vm.playerSelected = false;
  vm.draftComplete = false;
  vm.draftSaved = false;
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
    if(!vm.selectedTeam){
      vm.displayMessage = "No Team Selected";
      return;
    }
    var index=DataService.findTeamInfo(vm.selectedTeam);
    if(!vm.playerSelected){
      vm.displayMessage = "No player Selected";
      return;
    }
    if(vm.amount>vm.data.teamInfo[index].cash){
      vm.displayMessage = "Invalid funds";
      return;
    }
    if(vm.data.teamInfo[index].teamList.length >= parseInt(vm.data.selectedRounds)){
      vm.displayMessage = "Roster Full"
      return;
    }
    if(!vm.amount){
      vm.displayMessage = "No Amount Entered";
      return;
    }
    vm.data.teamInfo[index].teamList.push(vm.selectedPlayer);
    vm.data.teamInfo[index].cash-=vm.amount;
    var location = vm.data.players.indexOf(vm.selectedPlayer);
    var playerArray=DataService.locateArray(vm.selectedPlayer.position);
    var locationTwo = playerArray.indexOf(vm.selectedPlayer);
    vm.data.players.splice(location, 1);
    DataService.locateArray(vm.selectedPlayer.position).splice(locationTwo, 1);
    getDisplayList(currentDisplay, displayIndex);
    vm.playerSelected=false;
    vm.displayMessage = vm.selectedPlayer.displayname + " added to " + vm.data.teamInfo[index].teamName;
    vm.selectedPlayer = {};
    vm.amount= null;
    console.log(location, locationTwo);
  }
  vm.completeDraft = function (){
    vm.draftComplete=true;
    DataService.sendDraft();
  }
  vm.saveDraft = function(){
    vm.draftSaved = true;
    DataService.saveDraft();
  }
  console.log(vm.data.teamInfo);
  getDisplayList(vm.data.players, displayIndex);
}]);
