var router = require('express').Router();
var request = require('request');
require('dotenv').config();
var ranked={};
var players=[];
router.get('/', function(req, res){
    getPlayers();
    res.sendStatus(200);
});
router.get('/players', function(req, res){
  res.send(players);
})
function getPlayers(){
  request("http://www.fantasyfootballnerd.com/service/draft-rankings/json/"+process.env.key+"/0/",
  function(err, res, body){
    var rankedplayers=[];
    if(err){
      console.log('request rank error', err);
    }
    else{
      ranked=JSON.parse(body);
      players=ranked.DraftRankings;
    }
  })
}


module.exports = router;
