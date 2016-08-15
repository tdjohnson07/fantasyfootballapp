//functions used by save route to save drafts to the DB
var pg = require('pg');
var connectionString='';
if(process.env.DATABASE_URL != undefined) {
  connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
  // running locally, use our local database instead
  // connectionString = 'postgres://localhost:5432/fantasyDB';
  connectionString= 'fantasyDB';
}
var config = {
  database: connectionString,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);
//function used to create draft instance in DB
function createDraft(userid, date, draftname, numofteams, numofrounds, callback){
  pool.connect(function(err, client, done){
    if(err){
      console.log('createdraft save err', err);
      done();
      return callback(err);
    }
    client.query("INSERT INTO drafts (userid, date, draftname, numberofteams, numberofrounds) VALUES ($1, $2, $3, $4, $5)",
    [userid, date, draftname, numofteams, numofrounds], function(err, result){
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
//function used to find draft id by userid and date
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
//function used to save teams in draft to DB
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
//function used to find team ids based on draft id
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
//function used to save players in draft to DB
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
