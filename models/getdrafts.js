//functions used by drafts route to pull saved drafts from DB
var pg = require('pg');
var connectionString='fantasyDB';
// if(process.env.DATABASE_URL != undefined) {
//   // connectionString = process.env.DATABASE_URL + "?ssl=true";
//   connectionString='postgres://ymiplqczvfkqmx:wo9cZpsvgC42lDpOntf-Brc-_M@ec2-107-20-198-81.compute-1.amazonaws.com:5432/d6s3398s2754r8'
// } else {
//   //running locally, use our local database instead
//   // connectionString = 'postgres://localhost:5432/fantasyDB';
//   connectionString= 'fantasyDB';
// }
var config = {
  database: connectionString,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);
//function to find drafts by user id
function findDrafts(id, callback){
  pool.connect(function(err, client, done){
    if(err){
      console.log('findDrafts connect error', err);
      done();
      return callback(err);
    }
    client.query("SELECT * FROM drafts where userid=$1", [id], function(err, result){
      if(err){
        console.log("findDrafts query err", err);
        done();
        return callback(err);
      }
      done();
      return callback(null, result);
    })
  })
}
//function used to find specific draft by draft id
function getCurrent(id, callback){
  pool.connect(function(err, client, done){
    if(err){
      console.log('getcurrent connect error', err);
      done();
      return callback(err);
    }
    client.query("SELECT * FROM players JOIN draftedplayers ON draftedplayers.playerid = players.id JOIN teams ON draftedplayers.teamid = teams.id WHERE teams.draftid=$1 ORDER BY teams.id",
   [id], function(err, result){
     if(err){
       console.log('get current query error', err);
       done();
       return callback(err);
     }
     done();
     return callback(null, result);
   })
  })
}
module.exports = {
  findDrafts: findDrafts,
  getCurrent: getCurrent
}
