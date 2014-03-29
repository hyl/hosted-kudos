//initialise Express
var express = require('express');
var app = express();
//load redis
var redis = require('redis');
    redisClient = redis.createClient();
//configure current count
var currentcount;

//allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

redisClient.on('error', function(err) {
  console.log('[ERR] ' + err);
})

app.get('/view/:id', function(req, res){
  redisClient.get(req.params.id, function(err, reply) {
    //account for it not being set
    if(reply == null) {
      res.send('0');
    } else {
      res.send(reply.toString());
    }
  });
});

app.get('/add/:id', function(req, res){
  //get the current kudos value
  redisClient.get(req.params.id, function(err, reply) {
    if(reply == null) {
      currentCount = 0;
    } else {
      currentCount = reply;
    }
      //set the new value
      currentCount++;
      redisClient.set(req.params.id, currentCount, redis.print);
      res.send(currentCount.toString());
  })
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port %d', server.address().port);
})
