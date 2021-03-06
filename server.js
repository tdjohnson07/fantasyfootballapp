var express=require('express');
var index=require('./routes/index');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var register = require('./routes/register');
var login = require('./routes/login');
var players = require('./routes/players');
var save = require('./routes/save');
var drafts = require('./routes/drafts');
var ranked = require('./routes/ranked');
var values = require('./routes/values');
var app=express();

app.use(session({
  secret: 'thisshouldntbehere',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 3600, secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done){
  User.findAndComparePassword(username, password, function(err, isMatch, user){
    if (err){
      return done(err);
    }
    if(isMatch){
      return done(null, user);
    }
    else{
      done(null, false);
    }
  });
}));
passport.serializeUser(function(user, done){
  done(null, user.id)
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if (err){
      return done(err);
    }
    else{
      done(null, user);
    }
  });
});
app.use(bodyParser.json());
//static files
app.use(express.static('public'));
//routes
app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/players', players);
app.use('/save', save);
app.use('/drafts', drafts);
app.use('/ranked', ranked);
app.use('/values', values);

var server=app.listen(process.env.PORT || 3000, function(){
  var port=server.address().port;
  console.log("listening on port", port);
});
