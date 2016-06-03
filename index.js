var express = require('express');

var api = express();

api.get('/', function(req, res, next){
  res.send('HELLO WORLD');
})

api.get('/contacts', function(req, res, next){
  res.send([]);
});

console.log("API LISTENING");
api.listen(3000);

module.exports = api;
