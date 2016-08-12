angular.module('fantasyApp').controller('auctiondraftController',['$location', 'DataService', function($location, DataService){
  console.log(DataService.data);
  var vm = this;
  vm.data = DataService.data;
  if(vm.data.idp){
    vm.positions=['QB','RB', 'WR', 'TE', 'K', 'DEF', 'ALL', 'DT', 'DE', 'LB', 'S', 'CB'];
  }else{
    vm.positions=['QB','RB', 'WR', 'TE', 'K', 'DEF', 'ALL'];
  }
  vm.displayList=[];
  vm.selectedPlayer={};
  vm.displayMessage= "Have Fun Drafting";
  vm.endList=false;
  vm.startList=true;
  vm.playerSelected = false;
  vm.draftComplete = false;
  vm.draftSaved = false;
  vm.draftnotSaved=false;
  vm.undune=true;
  var lastPick={};
  var lastPickTwo={};
  var lastTeamIndex;
  var lastAmount;
  var currentDisplay=vm.data.ranked;
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
    vm.selectedP=player;
    vm.selectedPlayer=DataService.locatePlayer(player);
  }
  vm.draft = function(){
    if(!vm.selectedTeam){
      vm.displayMessage = "No Team Selected";
      return;
    }
    var index=DataService.findTeamInfo(vm.selectedTeam);
    lastTeamIndex=index;
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
    if(vm.amount<0){
      vm.displayMessage = "Not a valid amount";
      return;
    }
    if(!vm.amount){
      vm.amount=0;
    }
    lastAmount=vm.amount;
    vm.data.teamInfo[index].teamList.push(vm.selectedPlayer);
    vm.data.teamInfo[index].cash-=vm.amount;
    var location = vm.data.players.indexOf(vm.selectedPlayer);
    var playerArray=DataService.locateArray(vm.selectedP.position);
    var locationTwo = playerArray.indexOf(vm.selectedP);
    var locationThree = vm.data.ranked.indexOf(vm.selectedP);
    vm.data.ranked.splice(locationThree, 1);
    vm.data.players.splice(location, 1);
    DataService.locateArray(vm.selectedP.position).splice(locationTwo, 1);
    getDisplayList(currentDisplay, displayIndex);
    vm.playerSelected=false;
    vm.displayMessage = vm.selectedPlayer.displayname + " added to " + vm.data.teamInfo[index].teamName;
    lastPick=vm.selectedPlayer;
    lastPickTwo=vm.selectedP;
    vm.selectedPlayer = {};
    vm.amount= null;
    vm.undune=false;
    console.log(location, locationTwo);
  }
  vm.undo = function(){
  DataService.locateArray(lastPickTwo.position).push(lastPickTwo);
  vm.data.ranked.push(lastPickTwo);
  vm.data.players.push(lastPick);
  vm.data.teamInfo[lastTeamIndex].teamList.pop();
  vm.data.teamInfo[lastTeamIndex].cash+=lastAmount;
  vm.displayMessage="Player removed";
  vm.undune=true;
  }
  vm.completeDraft = function (){
    for(var i=0; i<vm.data.setTeams.length; i++){
      if(vm.data.teamInfo[i].teamList.length<parseInt(vm.data.selectedRounds)){
        vm.displayMessage="Please Fill rosters before completing";
        return;
      }
    }
    vm.draftComplete=true;
    vm.draftnotSaved=true;
    DataService.sendDraft();
  }
  vm.saveDraft = function(){
    vm.draftnotSaved=false;
    vm.draftSaved = true;
    DataService.saveDraft();
  }
  console.log(vm.data.teamInfo);
  getDisplayList(vm.data.ranked, displayIndex);
}]);
