angular.module('fantasyApp').controller('indisetupController',['IndiService', '$location', function(IndiService, $location){
  var vm = this;
  vm.draftName="";
  vm.auctionTrue = false;
  vm.display = false;
  vm.enterCash = function(){
    vm.auctionTrue=true;
  }
  vm.start = function(){
    if(!vm.draftName){
      vm.display= true;
      vm.displayMessage = "Please Enter a name for your draft";
      return;
    }
    if(vm.cash){
      IndiService.data.cash = vm.cash;
    }
    IndiService.data.draftName = vm.draftName;
    IndiService.data.idp = vm.idp;
    IndiService.sortPlayers(IndiService.data.ranked);
    IndiService.sortPlayersAuction(IndiService.data.values);
    IndiService.sortDef(IndiService.data.players);
    $location.path('/indidraft');
  }
  IndiService.getPlayers();
  IndiService.getRankedPlayers();
  IndiService.getValuePlayers();
}]);
