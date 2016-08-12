angular.module('fantasyApp').factory('DataService',['$http', function($http){
  var data = {};
  //list of varibles used to set up draft
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
  //function called on home page to reset draft information before new draft occurs
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
    data.draftOrder=[];
    data.selectedRounds= 0;
    data.idp=false;
    data.randomize=false;
  }
  //function to convert selected time to a number in seconds
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
  //function used to sort an array of players into arrays based on position
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
//function used to sort an array of players into postion arrays for defensive players
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
//function used to set all team information for a draft
function setTeamInfo(){
  for (var i=0; i<data.setTeams.length; i++){
    var team ={};
    team.teamName = data.setTeams[i];
    team.cash = data.cash;
    team.teamList=[];
    data.teamInfo.push(team);
  }
}
//function used to locate a players postion array, takes in a postion
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
//function used to locate player index in the master list of players, takes a player and uses their id
function locatePlayer(player){
  var id=player.playerId;
  for(var i=0; i<data.players.length; i++){
    if(parseInt(id) == parseInt(data.players[i].playerid)){
      return data.players[i];
    }
  }
  return player;
}
//function used to find the index of a team takes in a string of team name
function findTeamInfo(team){
  var index = 0;
  for (var i=0; i<data.setTeams.length; i++){
    if(team==data.setTeams[i]){
      index = i;
    }
  }
  return index;
}
//function used by setDraftOrder to add teams to draftorder array takes in a array
function addToDraftOrder(teamArray){
  for(var i=0; i<teamArray.length; i++){
    data.draftOrder.push(teamArray[i]);
  }
}
//function used to set draft order, takes an array and reverses it for alternating rounds
function setDraftOrder(teamArray, rounds){
  addToDraftOrder(teamArray);
  for(var i=0; i<rounds-1; i++){
    teamArray.reverse();
    addToDraftOrder(teamArray);
  }
}
//function used to randomize draft order takes an array and returns newly shuffled array
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
//function to get full players list from DB
  function getPlayers(){
    $http.get('/players').then(handleSuccess, handleFailure);
  }
  //function to save full players list to data.players
  function handleSuccess(res){
    data.players = res.data
  }
  //generic failure request function
  function handleFailure(res){
    console.log('/players fail', res);
  }
  //function to get ranked players pulls from fantasyfootballnerd.com api and holds list on server
  function getRanked(){
    $http.get('/ranked').then(handleRankedSuccess, handleFailure);
  }
  //function to show success of getting ranked players to db
  function handleRankedSuccess(res){
    console.log(res);
  }
  //function to pull rank players from server to client
  function getRankedPlayers(){
    $http.get('/ranked/players').then(handleReturnRanked, handleFailure);
  }
  //success function to store ranked players to data.ranked
  function handleReturnRanked(res){
    data.ranked=res.data;
  }
  //function to save instance of draft in DB
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
  //function to get specific draft id of last saved instance
  function getDraftId(){
    var sendData = {};
    sendData.date = lastsaved;
    $http.post('/save/getdraft', sendData).then(sendTeams, failure);
  }
  //function used to save teams in a specific draft
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
  //function used to get draftid to save draft
  function saveDraft(){
    var sendData = {};
    sendData.draftid = mostRecentDraftId;
    $http.post('/save/getteamids', sendData).then(addPlayers, failure);
  }
  //function used to save players using draft id from response
  function addPlayers(res){
    for(var i=0; i<res.data.rows.length; i++){
      var team = res.data.rows[i].teamname;
      var id = res.data.rows[i].id;
      findTeamAndAddPlayers(team, id);
    }
  }
  //function that actualy send players to DB
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
  //generic handle success function
  function success(res){
    console.log('success');
  }
  //generic handle failure function
  function failure(res){
    console.log('failure');
  }
  function getDrafts(){
    $http.get('/drafts').then(getDraftsSuccess, failure);
  }
  function getDraftsSuccess(res){
    data.prevDrafts=res.data.rows;
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
