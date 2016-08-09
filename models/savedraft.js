var pg = require('pg');
var config = {
  database: 'fantasyDB',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);
function createDraft(userid, date, draftname, callback){
  pool.connect(function(err, client, done){
    if(err){
      console.log('createdraft save err', err);
      done();
      return callback(err);
    }
    client.query("INSERT INTO drafts (userid, date, draftname) VALUES ($1, $2, $3)",
    [userid, date, draftname], function(err, result){
      if(err){
        console.log('insert draft error', err);
        done();
        callback(err);
      }
      callback(null, result);
    })
  })
}
function getId(userid, date, callback){
  pool.connect(function(err, client, done){
    if(err){
      console.log('getID error', err);
      done();
      callback(err);
    }
    client.query("SELECT * FROM drafts WHERE userid=$1 AND date=$2",
  [userid, date], function(err, result){
    if(err){
      console.log("select id error", err);
      done();
      callback(err);
    }
    callback(null, result);
  })
  })
}
module.exports = {
  createDraft: createDraft,
  getId: getId
}
