angular.module('fantasyApp').controller('previousdraftselectController', ['$http', '$location', 'DataService', function($http, $location, DataService){
  var vm=this;
  vm.data=DataService.data;
  vm.showMessage=false;
  if(vm.data.prevDrafts.length==0){
    vm.showMessage=true;
  }
  vm.goToDraft = function(draft){
    console.log(draft);
    DataService.data.selectedDraft=draft;
    DataService.getCurrentDraft(draft);
    $location.path('/draftview');
  }
}]);
