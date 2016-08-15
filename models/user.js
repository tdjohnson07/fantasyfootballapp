//functions used to create and verify users and encrypt passwords stored in DB
var pg = require('pg');
var bcrypt= require('bcrypt');

var config = {
  if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
    // running locally, use our local database instead
    connectionString = 'postgres://localhost:5432/fantasyDB';
}

  database: connectionString,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);
//function used to create user in db
function CreateUser(username, password, callback){
  bcrypt.hash(password, 10, function(err, hash){
    pool.connect(function(err, client, done){
      if(err){
        console.log('creat user error', err);
        done();
        return callback(err);
      }
      client.query('INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, hash], function(err, result){
      if(err){
        console.log('insert error', err);
        done();
        return callback(err);
      }
      done();
      callback(null);
    })
    })
  })
}
//function to find user by there username
function findByUsername(username, callback){
  pool.connect(function(err, client, done){
    if (err){
      console.log('connection error', err);
      done();
      return callback(err);
    }
    client.query('SELECT * FROM users WHERE username=$1',[username], function(err, result){
      if (err){
        done();
        return callback(err);
      }
      else{
        done();
        callback(null, result.rows[0]);
      }
    });
  });
}
//function to find user by their id
function findById(id, callback){
  pool.connect(function(err, client, done){
    if(err){
      console.log('connection error', err);
      done();
      return callback(err);
    }
    client.query('SELECT * FROM users WHERE id=$1',[id],function(err, result){
        if(err){
          console.log('id query error', err);
          done();
          return callback(err);
        }
        done();
        callback(null, result.rows[0]);
    })
  })
}
//function to verify user and password match
function findAndComparePassword(username, canidatePassword, callback){
  findByUsername(username, function(err, user){
    if (err){
      return callback(err)
    }
    if (!user){
      return callback(null, false)
    }
    bcrypt.compare(canidatePassword, user.password, function(err, isMatch){
      if(err){
        console.log(err);
        callback(err);
      }
      else{
        callback(null, isMatch, user);
      }
    })
  })
}
module.exports= {
  findByUsername: findByUsername,
  findById: findById,
  findAndComparePassword: findAndComparePassword,
  CreateUser: CreateUser
};
