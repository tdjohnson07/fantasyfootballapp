angular.module('fantasyApp').factory('IndiService', ['$http', function($http){
  var data={};
  data.ipd = false;
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
  data.auctionqbs=[];
  data.auctionrbs=[];
  data.auctionwrs=[];
  data.auctiontes=[];
  data.auctionkicks=[];
  data.auctiondefs=[];
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
//function used to sort an array of players into arrays based on position
function sortPlayersAuction(players){
  for(var i=0; i<players.length; i++){
    var position=players[i].position;
    switch (position) {
      case "QB":
        data.auctionqbs.push(players[i])
        break;
      case "RB":
        data.auctionrbs.push(players[i])
        break;
      case "WR":
        data.auctionwrs.push(players[i])
        break;
      case "TE":
        data.auctiontes.push(players[i])
        break;
      case "K":
        data.auctionkicks.push(players[i])
        break;
      case "DEF":
        data.auctiondefs.push(players[i])
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
function locateArrayAuction(position){
  var playerArray=[];
  switch (position) {
    case "QB":
      playerArray=data.auctionqbs;
      break;
    case "RB":
      playerArray=data.auctionrbs;
      break;
    case "WR":
      playerArray=data.auctionwrs;
      break;
    case "TE":
      playerArray=data.auctiontes;
      break;
    case "K":
      playerArray=data.auctionkicks;
      break;
    case "DEF":
      playerArray=data.auctiondefs;
      break;
    case "ALL":
      playerArray=data.values;
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
  //function to pull rank players from server to client
  function getRankedPlayers(){
    $http.get('/ranked/players').then(handleReturnRanked, handleFailure);
  }
  //success function to store ranked players to data.ranked
  function handleReturnRanked(res){
    data.ranked=res.data;
  }
  function getValuePlayers(){
    $http.get('/values/players').then(handleReturnValues, handleFailure);
  }
  //success function to store ranked players to data.ranked
  function handleReturnValues(res){
    data.values=res.data;
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
  function locatePlayerAuction(player){
    var id=player.playerId;
    for(var i=0; i<data.values.length; i++){
      if(parseInt(id) == parseInt(data.values[i].playerId)){
        return data.values[i];
      }
    }
    return player;
  }
  function locatePlayerRanked(player){
    var id=player.playerId;
    for(var i=0; i<data.ranked.length; i++){
      if(parseInt(id) == parseInt(data.ranked[i].playerId)){
        return data.ranked[i];
      }
    }
    return player;
  }
  return {
    data: data,
    getRankedPlayers: getRankedPlayers,
    getPlayers: getPlayers,
    sortPlayers: sortPlayers,
    sortDef: sortDef,
    locateArray: locateArray,
    locatePlayer: locatePlayer,
    getValuePlayers: getValuePlayers,
    sortPlayersAuction: sortPlayersAuction,
    locateArrayAuction: locateArrayAuction,
    locatePlayerAuction: locatePlayerAuction,
    locatePlayerRanked: locatePlayerRanked
  }
}]);
