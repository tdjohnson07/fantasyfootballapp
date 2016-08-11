angular.module('fantasyApp').controller('snakedraftController',['$location','$timeout', 'DataService', function($location,$timeout, DataService){
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
  vm.draftComplete = false;
  vm.draftSaved = false;
  vm.missedPicks=[];
  vm.missedTeam;
  vm.missed=false;
  var currentDisplay=vm.data.players;
  var displayIndex =0;
  vm.startCountdown = function(){
  	vm.timerCount = vm.data.pickTime;
  	var countDown = function () {
  		if (vm.timerCount < 0) {
  		  //Any desired function upon countdown end.
        vm.missed=true;
        vm.missedPicks.push(vm.selectedTeam);
        selectedTeamIndex++;
        vm.selectedTeam = vm.data.draftOrder[selectedTeamIndex];
        vm.onDeck = vm.data.draftOrder[selectedTeamIndex+1];
        vm.inTheHole = vm.data.draftOrder[selectedTeamIndex+2];
  		  vm.displayMessage="missed pick";
        vm.startCountdown();
  		} else {
  		  vm.countDownLeft = vm.timerCount;
        vm.minutes=Math.floor(vm.timerCount/60);
        vm.seconds=vm.timerCount-(vm.minutes*60);
  		  vm.timerCount--;
  		  $timeout(countDown, 1000);
  		}
  	};
  	vm.countDownLeft = vm.timerCount;
    vm.minutes=Math.floor(vm.timerCount/60);
    vm.seconds=vm.timerCount-(vm.minutes*60);
  	countDown();
  }
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
    vm.timerCount=vm.data.pickTime;
    console.log(location, locationTwo);

  }
  vm.makeMissed = function(){
    var index = DataService.findTeamInfo(vm.missedTeam);
    vm.data.teamInfo[index].teamList.push(vm.selectedPlayer);
    var location = vm.data.players.indexOf(vm.selectedPlayer);
    var playerArray=DataService.locateArray(vm.selectedPlayer.position);
    var locationTwo = playerArray.indexOf(vm.selectedPlayer);
    var teamlocal = vm.missedPicks.indexOf(vm.missedTeam);
    vm.missedPicks.splice(teamlocal, 1);
    vm.data.players.splice(location, 1);
    DataService.locateArray(vm.selectedPlayer.position).splice(locationTwo, 1);
    getDisplayList(currentDisplay, displayIndex);
    vm.playerSelected=false;
    vm.displayMessage = vm.selectedPlayer.displayname + " added to " + vm.data.teamInfo[index].teamName;
    vm.selectedPlayer = {};
    if(vm.missedPicks.length===0){
      vm.missed=false;
    }
    vm.timerCount=vm.data.pickTime;
  }
  vm.completeDraft = function (){
    for(var i=0; i<vm.data.setTeams.length; i++){
      if(vm.data.teamInfo[i].teamList.length<parseInt(vm.data.selectedRounds)){
        vm.displayMessage="Please Fill Rosters Before Completing";
        return;
      }
    }
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
