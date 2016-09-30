angular.module('fantasyApp').controller('indidraftController',['IndiService', function(IndiService){
  var vm = this;
  vm.data = IndiService.data;
  if(vm.data.idp){
    vm.positions=['QB','RB', 'WR', 'TE', 'K', 'DEF', 'ALL', 'DT', 'DE', 'LB', 'S', 'CB'];
  }else{
    vm.positions=['QB','RB', 'WR', 'TE', 'K', 'DEF', 'ALL'];
  }
  vm.displayList=[];
  vm.teamlist=[];
  vm.selectedPlayer={};
  vm.displayMessage= "Have Fun Drafting";
  vm.endList=false;
  vm.startList=true;
  vm.playerSelected = false;
  vm.draftComplete = false;
  vm.draftSaved = false;
  vm.draftnotSaved=false;
  vm.auctionTrue = false;
  vm.amount = 0;
  var currentDisplay=vm.data.ranked;
  var displayIndex =0;
  console.log(vm.data.values);
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
    vm.startList=true;
    displayIndex=0;
    if(vm.auctionTrue){
      var playerArray=IndiService.locateArrayAuction(position);
    }else{
      var playerArray=IndiService.locateArray(position);
    }
    currentDisplay=playerArray;
    getDisplayList(playerArray, displayIndex);
  }
  vm.auction = function(){
    vm.startList=true;
    vm.auctionTrue = true;
    displayIndex=0;
    currentDisplay=vm.data.values;
    getDisplayList(currentDisplay, displayIndex);
  }
  vm.regular = function(){
    vm.startList=true;
    vm.auctionTrue = false;
    displayIndex=0;
    currentDisplay=vm.data.ranked;
    getDisplayList(currentDisplay, displayIndex);
  }
  vm.selectPlayer = function(player){
    vm.displayMessage="";
    vm.playerSelected = true;
    if(vm.auctionTrue){
      vm.selectedP=IndiService.locatePlayerAuction(player);
    }
    else{
      vm.selectedP= IndiService.locatePlayerRanked(player);
    }
    vm.selectedPlayer=IndiService.locatePlayer(player);
  }
  vm.draft = function(){
    if(!vm.playerSelected){
      vm.displayMessage = "No player Selected";
      return;
    }
    vm.teamlist.push(vm.selectedP);
    vm.displayMessage=vm.selectedPlayer.displayname + " added to your team";
    if(vm.data.cash){
      vm.data.cash -= vm.amount;
    }
    vm.drafted = true;
    vm.eliminate();
    vm.amount = 0;
  }
  vm.eliminate = function(){
    if(!vm.playerSelected){
      vm.displayMessage = "No player Selected";
      return;
    }
    if(vm.auctionTrue){
      var location = vm.data.players.indexOf(vm.selectedPlayer);
      var playerArray=IndiService.locateArrayAuction(vm.selectedP.position);
      var locationTwo = playerArray.indexOf(vm.selectedP);
      IndiService.locateArrayAuction(vm.selectedP.position).splice(locationTwo, 1);
      var locationThree = vm.data.values.indexOf(vm.selectedP);
      var player = IndiService.locatePlayerRanked(vm.selectedP);
      var locationFour = vm.data.ranked.indexOf(player);
      var playerArrayTwo = IndiService.locateArray(player.position);
      var locationFive = playerArrayTwo.indexOf(player);
      IndiService.locateArray(player.position).splice(locationFive, 1);
      vm.data.ranked.splice(locationFour, 1);
      vm.data.values.splice(locationThree, 1);
      vm.data.players.splice(location, 1);
    }else{
    var location = vm.data.players.indexOf(vm.selectedPlayer);
    var playerArray=IndiService.locateArray(vm.selectedP.position);
    var locationTwo = playerArray.indexOf(vm.selectedP);
    var locationThree = vm.data.ranked.indexOf(vm.selectedP);
    var player = IndiService.locatePlayerAuction(vm.selectedP);
    var locationFour = vm.data.values.indexOf(player);
    var playerArrayTwo = IndiService.locateArrayAuction(player.position);
    var locationFive = playerArrayTwo.indexOf(player);
    IndiService.locateArrayAuction(player.position).splice(locationFive, 1);
    vm.data.values.splice(locationFour, 1);
    vm.data.ranked.splice(locationThree, 1);
    vm.data.players.splice(location, 1);
    IndiService.locateArray(vm.selectedP.position).splice(locationTwo, 1);
    }
    getDisplayList(currentDisplay, displayIndex);
    if(!vm.drafted){
      vm.displayMessage=vm.selectedPlayer.displayname + " elimated";
    }
    vm.playerSelected=false;
    vm.selectedPlayer = {};
    vm.amount= null;
    vm.drafted = false;
  }
  getDisplayList(vm.data.ranked, displayIndex);
}]);
