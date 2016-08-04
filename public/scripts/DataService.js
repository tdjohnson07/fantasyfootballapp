angular.module('fantasyApp').factory('DataService',['$http', function($http){
  var data = {};
  data.draftType = "";
  data.draftName = "";
  data.setTeams =[];
  data.idp=false;
  data.selectedRounds= 0;
  data.randomize=false;
  data.qbs=[];
  data.rbs=[];
  data.wrs=[];
  data.tes=[];
  data.kicks=[];
  data.defs=[];
  data.teamInfo=[];
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
  function sortPlayers(){
    for(var i=0; i<data.players.length; i++){
      var position=data.players[i].position;
      switch (position) {
        case "QB":
          data.qbs.push(data.players[i])
          break;
        case "RB":
          data.rbs.push(data.players[i])
          break;
        case "WR":
          data.wrs.push(data.players[i])
          break;
        case "TE":
          data.tes.push(data.players[i])
          break;
        case "K":
          data.kicks.push(data.players[i])
          break;
        case "DEF":
          data.defs.push(data.players[i])
          break;
    }
  }
}
function setTeamInfo(){
  for (var i=0; i<data.setTeams.length; i++){
    var team ={};
    team.teamName = data.setTeams[i];
    team.cash = data.cash;
    team.teamList=[];
    data.teamInfo.push(team);
  }
}
  function getPlayers(){
    $http.get('/players').then(handleSuccess, handleFailure);
  }
  function handleSuccess(res){
    data.players = res.data
    console.log(data.players);
  }
  function handleFailure(res){
    console.log('/players fail', res);
  }
  getPlayers();
  return {
    data: data,
    convertTime: convertTime,
    getPlayers: getPlayers,
    sortPlayers: sortPlayers,
    setTeamInfo: setTeamInfo
  }
}])
