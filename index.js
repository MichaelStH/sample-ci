var express = require('express');
var bodyparser = require('body-parser')
var _ = require('lodash');

var api = express();
var contacts =[];
var count = 0;
var PORT_NUMBER = 3000;

api.use(express.static('public'));


api.get('/api/contacts', function(req, res, next){
  res.send(contacts);
});

api.get('/api/contacts/:name', function(req, res, next){
  res.send(contacts);
});

api.post('/api/contacts',
bodyparser.json(),
function(req, res, next){
  var contact = req.body.contact

  if (typeof contact !== 'object'){
    return res.status(422).send('Unprocessable entity');
  }
  contacts.push(contact);
  res.send(contact);
});

api.put('/api/contacts/:name/:new', function(req, res, next){
  contacts = contacts.map(function(contact){
    if (contact.name === req.params.name){
      count++;
      contact.name = req.params.new;
    }

    return contact;
  });

  res.send({count: count});

});

api.delete('/api/contacts/:name', function(req, res, next){
  var count = 0;
  contacts = _.remove(contacts, function(contact){
    if(contact.name !== req.params.name){
      return false;

    }
    count++;
    return true;

  });

  res.send({count: count});

});


var port = process.env.port || PORT_NUMBER;
console.log("API LISTENING ON " + port);
api.listen(port);

module.exports = api;
