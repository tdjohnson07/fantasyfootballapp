//functions used by drafts route to pull saved drafts from DB
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
