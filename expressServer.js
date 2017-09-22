const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/pets', function(req, res) {
  fs.readFile('./pets.json', 'utf8', (err, data) => {
    let myData = data;
    res.set('Content-Type', 'application/json');
    res.send(myData);
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile('./pets.json', 'utf8', (err, data) => {
    let myData = data;
    if(req.params.id >= 0 && req.params.id < JSON.parse(myData).length){
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify(JSON.parse(myData)[req.params.id]));
    } else {
      res.set('Content-Type', 'text/plain');
      res.sendStatus(404);
    }
  });
});


app.use(function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
