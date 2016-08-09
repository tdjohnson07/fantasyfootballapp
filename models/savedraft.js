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
        return callback(err);
      }
      done();
      return callback(null, result);
    })
  })
}
function getId(userid, date, callback){
  pool.connect(function(err, client, done){
    if(err){
      console.log('getID error', err);
      done();
      return callback(err);
    }
    client.query("SELECT * FROM drafts WHERE userid=$1 AND date=$2",
  [userid, date], function(err, result){
    if(err){
      console.log("select id error", err);
      done();
      return callback(err);
    }
    done();
    return callback(null, result);
  })
  })
}
function sendTeams(draftid, teamname, callback){
  pool.connect(function(err, client, done){
    if(err){
      console.log("sendteam connect error", err);
      done();
      return callback(err);
    }
    client.query("INSERT INTO teams (draftid, teamname) VALUES ($1, $2)",
    [draftid, teamname], function(err, result){
      if(err){
        console.log("insert teams error", err);
        done();
        return callback(err);
      }
      done();
      return callback(null, result);
    })
  })
}
function getTeamIds(draftid, callback){
  pool.connect(function(err, client, done){
    if(err){
      console.log("getteamids connect error", err);
      done();
      return callback(err);
    }
    client.query("SELECT * FROM teams where draftid=$1",[draftid],
    function(err, result){
      if(err){
        console.log("get teams query error", err);
        done();
        return callback(err);
      }
      done();
      callback(null, result);
    })
  })
}
function sendPlayers(draftid, teamid, playerid, callback){
  pool.connect(function(err, client, done){
    if(err){
      console.log("sendPlayers connect error", err);
      done();
      return callback(err);
    }
    client.query("INSERT INTO draftedplayers (draftid, teamid, playerid) VALUES ($1, $2, $3)",
    [draftid, teamid, playerid],function(err, result){
      if(err){
        console.log("insert sendplayers error", err);
        done();
        return callback(err);
      }
      done();
      return callback(null, result);
    })
  })
}
module.exports = {
  createDraft: createDraft,
  getId: getId,
  sendTeams: sendTeams,
  getTeamIds: getTeamIds,
  sendPlayers: sendPlayers
}
