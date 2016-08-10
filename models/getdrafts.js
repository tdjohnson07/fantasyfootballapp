var pg = require('pg');
var config = {
  database: 'fantasyDB',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);
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
