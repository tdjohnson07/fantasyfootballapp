var router = require('express').Router();
var getdrafts = require('../models/getdrafts');

router.get('/', function(req, res){
  var id = req.user.id;
  getdrafts.findDrafts(id, function(err, result){
    if(err){
      console.log('get error in route', err);
    }
    else{
      res.send(result);
    }
  });
});
router.post('/getCurrent', function(req, res){
  getdrafts.getCurrent(req.body.draft.id, function(err, result){
    if(err){
      console.log('getCurrent error in route', err);
    }
    else{
      res.send(result);
    }
  })
});
module.exports = router;
