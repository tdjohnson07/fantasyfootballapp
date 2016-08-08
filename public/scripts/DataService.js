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
  data.draftOrder=[];
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
function locateArray(position){
  var playerArray=[];
  switch (position) {
    case "QB":
      playerArray=data.qbs;
      break;
    case "RB":
      playerArray=data.rbs;
      break;
    case "WR":
      playerArray=data.wrs;
      break;
    case "TE":
      playerArray=data.tes;
      break;
    case "K":
      playerArray=data.kicks;
      break;
    case "DEF":
      playerArray=data.defs;
      break;
    case "ALL":
      playerArray=data.players;
  }
  return playerArray;
}
function findTeamInfo(team){
  var index = 0;
  console.log(team);
  console.log(data.setTeams);
  for (var i=0; i<data.setTeams.length; i++){
    if(team==data.setTeams[i]){
      index = i;
      console.log('found match');
    }
  }
  return index;
}
function addToDraftOrder(teamArray){
  for(var i=0; i<teamArray.length; i++){
    data.draftOrder.push(teamArray[i]);
  }
}
function setDraftOrder(teamArray, rounds){
  addToDraftOrder(teamArray);
  for(var i=0; i<rounds-1; i++){
    teamArray.reverse();
    addToDraftOrder(teamArray);
  }
}
function randomize(teamArray){
  for(var i=teamArray.length-1; i>0; i--){
    var ranIndex=Math.floor(Math.random()*(teamArray.length))
    var temp = teamArray[i];
    teamArray[i]=teamArray[ranIndex];
    teamArray[ranIndex]=temp;
  }
  console.log(teamArray);
  return teamArray;
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
    setTeamInfo: setTeamInfo,
    locateArray: locateArray,
    findTeamInfo: findTeamInfo,
    setDraftOrder: setDraftOrder,
    randomize: randomize
  }
}])
