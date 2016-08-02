angular.module('fantasyApp').factory('DataService',['$http', function($http){
  var data = {};
  data.draftType = "";
  data.setTeams =[];
  data.idp=false;
  data.selectedRounds= 0;
  data.randomize=false;
  return {
    data: data
  }
}])
