angular.module('fantasyApp').factory('DataService',['$http', function($http){
  var data = {};
  data.draftType = "";
  data.draftName = "";
  data.setTeams =[];
  data.idp=false;
  data.selectedRounds= 0;
  data.randomize=false;
  function convertTime(timestring){
    var time=0;
    switch (timestring) {
      case "1:00":
        time = 60 * 1000;
        break;
      case "1:30":
        time = 90 * 1000;
        break;
      case "2:00":
        time = 120 * 1000;
        break;
      case "2:30":
        time = 150 * 1000;
        break;
      case "3:00":
        time = 180 * 1000;
        break;
      case "3:30":
        time = 210 * 1000;
        break;
      case "4:00":
        time = 240 * 1000;
        break;
      default:
        time = 120 * 1000;
      }
      return time;
  }
  return {
    data: data,
    convertTime: convertTime
  }
}])
