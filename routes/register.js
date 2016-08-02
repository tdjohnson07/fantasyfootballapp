var router = require('express').Router();
var path = require('path');
var User = require('../models/user');

router.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname,'../public/views/register.html'))
});

router.post('/', function(req, res){
  User.CreateUser(req.body.username, req.body.password, function(err){
    if(err){
      console.log('error in creating', err);
      res.sendStatus(500);
    }
    else{
      res.redirect('/');
    }
  });
});
module.exports = router;
