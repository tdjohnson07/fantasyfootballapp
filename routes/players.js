var router = require('express').Router();
var pg = require('pg');
var config = {
  database: 'fantasyDB',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
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
        console.log('get players success');
        res.send(result.rows);
        done();
      }
    })
  })
})

module.exports = router;
