var router = require('express').Router();
var savedraft = require('../models/savedraft');

router.post('/', function(req, res){
  savedraft.createDraft(req.user.id, req.body.date, req.body.draftname, req.body.numofteams, req.body.numofrounds, function(err, result){
    if(err){
      console.log("save draft route error in createDraft", err);
    }
    else{
      res.send(result);
    }
  })
});
router.post('/getdraft', function(req, res){
    savedraft.getId(req.user.id, req.body.date, function(err, result){
      if(err){
        console.log("get draft id error", err);
      }
      else{
        res.send(result);
      }
    })
});
router.post('/sendteams', function(req, res){
    savedraft.sendTeams(req.body.draftid, req.body.teamname, function(err, result){
      if(err){
        console.log('sendTeams error', err);
      }
      else{
        res.send(result);
      }
    })
});
router.post('/getteamids', function(req, res){
  savedraft.getTeamIds(req.body.draftid, function(err, result){
    if(err){
      console.log('getTeamIds error', err);
    }
    else{
      res.send(result);
    }
  });
})
router.post('/addplayer', function(req, res){
  savedraft.sendPlayers(req.body.draftid, req.body.teamid, req.body.playerid, function(err, result){
    if(err){
      console.log('addplayer error', err);
    }
    else{
      res.send(result);
    }
  })
})
module.exports = router;
