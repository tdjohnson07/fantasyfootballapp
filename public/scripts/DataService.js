angular.module('fantasyApp').factory('DataService',['$http', function($http){
  var data = {};
  data.draftType = "";
  data.draftName = "";
  data.setTeams =[];
  data.selectedRounds= 0;
  data.idp=false;
  data.randomize=false;
  data.qbs=[];
  data.rbs=[];
  data.wrs=[];
  data.tes=[];
  data.kicks=[];
  data.defs=[];
  data.des=[];
  data.dts=[];
  data.lbs=[];
  data.safetys=[];
  data.cbs=[];
  data.teamInfo=[];
  data.draftOrder=[];
  data.prevDrafts =[];
  data.selectedDraft={};
  data.draftToView=[];
  data.teams=[];
  var lastsaved;
  var mostRecentDraftId;
  function emptyArrays(){
    data.qbs=[];
    data.rbs=[];
    data.wrs=[];
    data.tes=[];
    data.kicks=[];
    data.defs=[];
    data.des=[];
    data.dts=[];
    data.lbs=[];
    data.safetys=[];
    data.cbs=[];
  }
  function convertTime(timestring){
    var time=0;
    switch (timestring) {
      case "1:00":
        time = 60;
        break;
      case "1:30":
        time = 90;
        break;
      case "2:00":
        time = 120;
        break;
      case "2:30":
        time = 150;
        break;
      case "3:00":
        time = 180;
        break;
      case "3:30":
        time = 210;
        break;
      case "4:00":
        time = 240;
        break;
      default:
        time = 120 * 1000;
      }
      return time;
  }
  function sortPlayers(players){
    for(var i=0; i<players.length; i++){
      var position=players[i].position;
      switch (position) {
        case "QB":
          data.qbs.push(players[i])
          break;
        case "RB":
          data.rbs.push(players[i])
          break;
        case "WR":
          data.wrs.push(players[i])
          break;
        case "TE":
          data.tes.push(players[i])
          break;
        case "K":
          data.kicks.push(players[i])
          break;
        case "DEF":
          data.defs.push(players[i])
          break;
    }
  }
}
function sortDef(players){
  for(var i=0; i<players.length; i++){
    var position=players[i].position;
    switch (position) {
      case "DE":
        data.des.push(players[i])
        break;
      case "DT":
        data.dts.push(players[i])
        break;
      case "LB":
        data.lbs.push(players[i])
        break;
      case "S":
        data.safetys.push(players[i])
        break;
      case "CB":
        data.cbs.push(players[i])
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
      playerArray=data.ranked;
      break;
    case "DE":
      playerArray=data.des;
      break;
    case "DT":
      playerArray=data.dts;
      break;
    case "LB":
      playerArray=data.lbs;
      break;
    case "S":
      playerArray=data.safetys;
      break;
    case "CB":
      playerArray=data.cbs;
      break;
  }
  return playerArray;
}
function locatePlayer(player){
  var id=player.playerId;
  for(var i=0; i<data.players.length; i++){
    if(parseInt(id) == parseInt(data.players[i].playerid)){
      return data.players[i];
    }
  }
  return player;
}
function findTeamInfo(team){
  var index = 0;
  for (var i=0; i<data.setTeams.length; i++){
    if(team==data.setTeams[i]){
      index = i;
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
  function getRanked(){
    $http.get('/ranked').then(handleRankedSuccess, handleFailure);
  }
  function handleRankedSuccess(res){
    console.log(res);
  }
  function getRankedPlayers(){
    $http.get('/ranked/players').then(handleReturnRanked, handleFailure);
  }
  function handleReturnRanked(res){
    data.ranked=res.data;
    console.log(res);
  }
  function sendDraft(){
    var sendData = {};
    var date = new Date();
    lastsaved = date;
    sendData.date = date;
    sendData.draftname = data.draftName;
    sendData.numofteams = data.setTeams.length;
    sendData.numofrounds = data.selectedRounds;
    $http.post('/save', sendData).then(getDraftId, failure);
  }
  function getDraftId(){
    var sendData = {};
    sendData.date = lastsaved;
    $http.post('/save/getdraft', sendData).then(sendTeams, failure);
  }
  function sendTeams(res){
    var draftid = res.data.rows[0].id;
    mostRecentDraftId = draftid;
    for(var i=0; i<data.teamInfo.length; i++){
      var sendData = {};
      sendData.draftid = draftid;
      sendData.teamname=data.teamInfo[i].teamName;
      $http.post('/save/sendteams', sendData).then(success, failure);
    }
  }
  function saveDraft(){
    var sendData = {};
    sendData.draftid = mostRecentDraftId;
    $http.post('/save/getteamids', sendData).then(addPlayers, failure);
  }
  function addPlayers(res){
    console.log(res);
    console.log(data.teamInfo);
    for(var i=0; i<res.data.rows.length; i++){
      var team = res.data.rows[i].teamname;
      var id = res.data.rows[i].id;
      findTeamAndAddPlayers(team, id);
    }
  }
  function findTeamAndAddPlayers(team, id){
    console.log(data.teamInfo);
    for(var i=0; i<data.teamInfo.length; i++){
      if(team == data.teamInfo[i].teamName){
        for(var j=0; j<data.teamInfo[i].teamList.length; j++){
          var sendData={};
          console.log(i);
          sendData.draftid= mostRecentDraftId;
          sendData.teamid = id;
          sendData.playerid = data.teamInfo[i].teamList[j].id
          $http.post('/save/addplayer', sendData).then(success, failure);
        }
      }
    }
  }
  function success(res){
    console.log('success');
  }
  function failure(res){
    console.log('failure');
  }
  function getDrafts(){
    $http.get('/drafts').then(getDraftsSuccess, failure);
  }
  function getDraftsSuccess(res){
    data.prevDrafts=res.data.rows;
    console.log(data.prevDrafts);
    console.log('success');
  }
  function getCurrentDraft(draft){
    data.draftToView=[];
    data.teams=[];
    var sendData={};
    sendData.draft = draft;
    $http.post('/drafts/getCurrent', sendData).then(getCurrentSucess, failure);
  }
  function getCurrentSucess(res){
    console.log(res.data.rows);
    data.draftToView=res.data.rows;
    while(data.draftToView.length!= 0){
      data.teams.push(data.draftToView.splice(0,data.selectedDraft.numberofrounds));
    }
    console.log(data.teams);
  }
  // getPlayers();
  getRanked();
  return {
    data: data,
    convertTime: convertTime,
    getPlayers: getPlayers,
    sortPlayers: sortPlayers,
    setTeamInfo: setTeamInfo,
    locateArray: locateArray,
    findTeamInfo: findTeamInfo,
    setDraftOrder: setDraftOrder,
    randomize: randomize,
    sendDraft: sendDraft,
    saveDraft: saveDraft,
    getDrafts: getDrafts,
    getCurrentDraft: getCurrentDraft,
    getRankedPlayers: getRankedPlayers,
    locatePlayer: locatePlayer,
    sortDef: sortDef,
    getPlayers: getPlayers,
    emptyArrays: emptyArrays
  }
}]);
