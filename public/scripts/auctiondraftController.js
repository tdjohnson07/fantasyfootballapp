angular.module('fantasyApp').controller('auctiondraftController',['$location', 'DataService', function($location, DataService){
  var vm = this;
  vm.data = DataService.data;
  //list of varibles used by this controller
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
  //function used to changed list of players displayed, takes in an array and an index for that array
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
  //button function for next display, shows next 10 results
  vm.nextDisplay = function(){
    vm.endList=true;
    displayIndex+=10;
    getDisplayList(currentDisplay, displayIndex);
  }
  //button function for previous display, shows previous 10 results
  vm.prevDisplay = function(){
    vm.startList=true;
    displayIndex-=10;
    getDisplayList(currentDisplay, displayIndex);
  }
  //function used to change display list by position takes key of position
  vm.narrow = function(position){
    displayIndex=0;
    var playerArray=DataService.locateArray(position);
    currentDisplay=playerArray;
    getDisplayList(playerArray, displayIndex);
  }
  //function used to select player upon click
  vm.selectPlayer = function(player){
    vm.playerSelected = true;
    vm.selectedP=player;
    vm.selectedPlayer=DataService.locatePlayer(player);
  }
  //button function used to draft player, first checks it is an eligble draft
  //choice, then locates player in three arrays being used and removes them, then
  //saves the draft information for the undo function, then resets the selection process
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
  }
  //function used to undo last pick in the draft
  vm.undo = function(){
  DataService.locateArray(lastPickTwo.position).push(lastPickTwo);
  vm.data.ranked.push(lastPickTwo);
  vm.data.players.push(lastPick);
  vm.data.teamInfo[lastTeamIndex].teamList.pop();
  vm.data.teamInfo[lastTeamIndex].cash+=lastAmount;
  vm.displayMessage="Player removed";
  vm.undune=true;
  }
  //button function to start save process, first checks that rosters are full,
  //then saves draft instance and teams
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
  //button click function that saves players to specific draft once draft completed has occured
  vm.saveDraft = function(){
    vm.draftnotSaved=false;
    vm.draftSaved = true;
    DataService.saveDraft();
  }
  getDisplayList(vm.data.ranked, displayIndex);
}]);
