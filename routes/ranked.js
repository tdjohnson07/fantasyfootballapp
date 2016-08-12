var router = require('express').Router();
var request = require('request');
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
  request("http://www.fantasyfootballnerd.com/service/draft-rankings/json/sfvkjjeeymm8/0/",
  function(err, res, body){
    var rankedplayers=[];
    if(err){
      console.log('request rank error', err);
    }
    else{
      ranked=JSON.parse(body);
      // console.log(ranked.DraftRankings);
      players=ranked.DraftRankings;
    }
  })
}


module.exports = router;
