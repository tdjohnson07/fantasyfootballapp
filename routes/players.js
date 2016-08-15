var router = require('express').Router();
var pg = require('pg');
var connectionString='fantasyDB';
// if(process.env.DATABASE_URL != undefined) {
//   // connectionString = process.env.DATABASE_URL + "?ssl=true";
// connectionString=  'postgres://ymiplqczvfkqmx:wo9cZpsvgC42lDpOntf-Brc-_M@ec2-107-20-198-81.compute-1.amazonaws.com:5432/d6s3398s2754r8'
// } else {
//   //running locally, use our local database instead
//   // connectionString = 'postgres://localhost:5432/fantasyDB';
//   connectionString='fantasyDB'
// }
// console.log(connectionString);
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
