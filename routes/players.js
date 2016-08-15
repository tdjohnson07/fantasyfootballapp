var router = require('express').Router();
var pg = require('pg');
var url = require('url');
var config={};
if(process.env.DATABASE_URL != undefined) {
  // connectionString = process.env.DATABASE_URL + "?ssl=true";
  var params = url.parse(process.env.DATABASE_URL);
  var auth = params.auth ? params.auth.split(':') : [null, null];
    config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: process.env.SSL
  };
} else {
  config = {
    database: 'fantasyDB',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
  };
}

var pool = new pg.Pool(config);

router.get('/',function(req, res){
  pool.connect(function(err, client, done){
    if(err){
      console.log('creat user error', err);
      done();
      return callback(err);
    }
    client.query('SELECT * FROM players', function(err, result){
      if(err){
        console.log('get players error', err);
        done();
      }
      else{
        res.send(result.rows);
        done();
      }
    })
  })
})

module.exports = router;
