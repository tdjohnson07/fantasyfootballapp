var router = require('express').Router();
var pg = require('pg');
var connectionString='';
if(process.env.DATABASE_URL != undefined) {
  connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
  //running locally, use our local database instead
  // connectionString = 'postgres://localhost:5432/fantasyDB';
  connectionString='fantasyDB'
}
var config = {
  database: connectionString,
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
        res.send(result.rows);
        done();
      }
    })
  })
})

module.exports = router;
