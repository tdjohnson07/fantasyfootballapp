angular.module('fantasyApp').controller('auctiondraftController',['$location', 'DataService', function($location, DataService){
  console.log(DataService.data);
  var vm = this;
  vm.data = DataService.data;
  vm.positions=['QB','RB', 'WR', 'TE', 'K', 'DEF', 'ALL'];
  vm.displayList=[];
  vm.selectedPlayer={};
  var currentDisplay=vm.data.players;
  var displayIndex =0;
  function getDisplayList(playerArray, index){
    for(var i=0; i<10; i++, index++){
      vm.displayList[i]=playerArray[index];
    }
  }
  vm.nextDisplay = function(){
    displayIndex+=10;
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
    vm.selectedPlayer=player;
  }
  vm.draft = function(){
    var index=DataService.findTeamInfo(vm.selectedTeam);
    vm.data.teamInfo[index].teamList.push(vm.selectedPlayer);
    vm.data.teamInfo[index].cash-=vm.amount;
  }
  console.log(vm.data.teamInfo);
  getDisplayList(vm.data.players, displayIndex);
}]);
