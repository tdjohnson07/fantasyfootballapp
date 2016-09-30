angular.module('fantasyApp').controller('snakedraftController',['$location','$timeout', 'DataService', function($location,$timeout, DataService){
  var vm = this;
  vm.data = DataService.data;
  if(vm.data.idp){
    vm.positions=['QB','RB', 'WR', 'TE', 'K', 'DEF', 'ALL', 'DT', 'DE', 'LB', 'S', 'CB'];
  }else{
    vm.positions=['QB','RB', 'WR', 'TE', 'K', 'DEF', 'ALL'];
  }
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
  vm.draftnotSaved=false;
  vm.draftnotSaved=false;
  vm.missedPicks=[];
  vm.missedTeam;
  vm.missed=false;
  vm.showClock=false;
  vm.undune=true;
  var lastPick={};
  var lastPickTwo={};
  var lastTeamIndex;
  var currentDisplay=vm.data.ranked;
  var displayIndex =0;
  vm.startCountdown = function(){
    vm.showClock=true;
  	vm.timerCount = vm.data.pickTime;
  	 var countDown = function () {
  		if (vm.timerCount < 0 && vm.showClock===true) {
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
  vm.stopClock = function(){
    vm.showClock=false;
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
    vm.startList=true;
    displayIndex=0;
    var playerArray=DataService.locateArray(position);
    currentDisplay=playerArray;
    getDisplayList(playerArray, displayIndex);
  }
  vm.selectPlayer = function(player){
    vm.playerSelected = true;
    vm.selectedP=player;
    vm.selectedPlayer=DataService.locatePlayer(player);
    if(player == vm.selectedPlayer){
      console.log("matching");
      vm.selectedP = DataService.locatePlayerOpposite(player);
    }
  }
  vm.draft = function(){
    var index=DataService.findTeamInfo(vm.selectedTeam);
    lastTeamIndex=index;
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
    var playerArray=DataService.locateArray(vm.selectedP.position);
    var locationTwo = playerArray.indexOf(vm.selectedP);
    var locationThree = vm.data.ranked.indexOf(vm.selectedP);
    vm.data.ranked.splice(locationThree, 1);
    vm.data.players.splice(location, 1);
    DataService.locateArray(vm.selectedPlayer.position).splice(locationTwo, 1);
    getDisplayList(currentDisplay, displayIndex);
    vm.playerSelected=false;
    vm.displayMessage = vm.selectedPlayer.displayname + " added to " + vm.data.teamInfo[index].teamName;
    lastPick=vm.selectedPlayer;
    lastPickTwo=vm.selectedP;
    vm.selectedPlayer = {};
    selectedTeamIndex++;
    if(selectedTeamIndex >= vm.data.draftOrder.length){
      vm.displayMessage= "Draft Complete";
      vm.stopClock();
    }
    vm.selectedTeam = vm.data.draftOrder[selectedTeamIndex];
    vm.onDeck = vm.data.draftOrder[selectedTeamIndex+1];
    vm.inTheHole = vm.data.draftOrder[selectedTeamIndex+2];
    vm.timerCount=vm.data.pickTime;
    vm.undune=false;
  }
  vm.undo = function(){
  DataService.locateArray(lastPickTwo.position).push(lastPickTwo);
  vm.data.ranked.push(lastPickTwo);
  vm.data.players.push(lastPick);
  vm.data.teamInfo[lastTeamIndex].teamList.pop();
  selectedTeamIndex--;
  vm.selectedTeam = vm.data.draftOrder[selectedTeamIndex];
  vm.onDeck = vm.data.draftOrder[selectedTeamIndex+1];
  vm.inTheHole = vm.data.draftOrder[selectedTeamIndex+2];
  vm.timerCount=vm.data.pickTime;
  vm.undune=true;
  vm.displayMessage="Player Removed";
  }
  vm.makeMissed = function(){
    var index = DataService.findTeamInfo(vm.missedTeam);
    vm.data.teamInfo[index].teamList.push(vm.selectedPlayer);
    var location = vm.data.players.indexOf(vm.selectedPlayer);
    var playerArray=DataService.locateArray(vm.selectedP.position);
    var locationTwo = playerArray.indexOf(vm.selectedP);
    var teamlocal = vm.missedPicks.indexOf(vm.missedTeam);
    var locationThree = vm.data.ranked.indexOf(vm.selectedP);
    vm.data.ranked.splice(locationThree, 1);
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
    vm.draftnotSaved=true;
    vm.draftComplete=true;
    DataService.sendDraft();
  }
  vm.saveDraft = function(){
    vm.draftnotSaved=false;
    vm.draftSaved = true;
    DataService.saveDraft();
  }
  getDisplayList(vm.data.ranked, displayIndex);
}]);
