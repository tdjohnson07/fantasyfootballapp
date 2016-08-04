angular.module('fantasyApp').controller('auctiondraftController',['$location', 'DataService', function($location, DataService){
  console.log(DataService.data);
  var vm = this;
  vm.data = DataService.data;
  vm.displayList=[];
  var displayIndex =0;
  function getDisplayList(playerArray, index){
    for(var i=0; i<10; i++, index++){
      vm.displayList[i]=playerArray[index];
    }
  }
  vm.nextDisplay = function(){
    displayIndex+=10;
    getDisplayList(vm.data.players, displayIndex);
  }
  console.log(vm.data.teamInfo);
  getDisplayList(vm.data.players, displayIndex);
}]);
