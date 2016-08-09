var router = require('express').Router();
var savedraft = require('../models/savedraft');

router.post('/', function(req, res){
  savedraft.createDraft(req.user.id, req.body.date, req.body.draftname, function(err, result){
    if(err){
      console.log("save draft route error in createDraft", err);
    }
    else{
      res.send(result);
    }
  })
});
router.post('/getdraft', function(req, res){
    console.log(req.body);
    console.log(req.user);
    savedraft.getId(req.user.id, req.body.date, function(err, result){
      if(err){
        console.log("get draft id error", err);
      }
      else{
        res.send(result);
      }
    })
});

module.exports = router;
