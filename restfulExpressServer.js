const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/pets', function(req, res) {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    let myData = JSON.parse(data);
    if (req.params.id < 0 || req.params.id >= myData.length) {
      res.set('Content-Type', 'text/plain');
      res.sendStatus(404);
    } else {
      myData = myData[req.params.id];
      myData = JSON.stringify(myData);
      res.set('Content-Type', 'application/json');
      res.send(myData);
    }
  });
});

app.post('/pets', function(req, res) {
  if (!req.body.age || !req.body.kind || !req.body.name) {
    res.set('Content-Type', 'text/plain');
    res.sendStatus(400);
    res.send('Not Found');
  } else {
    fs.readFile('pets.json', 'utf8', (err, data) => {
      let myData = JSON.parse(data);
      myData.push(req.body);
      myData = JSON.stringify(myData);
      fs.writeFile('pets.json', myData, (err) => {
        res.set('Content-Type', 'application/json')
        res.status = 200;
        res.send(req.body);
      });
    });
  }
});

app.patch('/pets/:id', function(req, res) {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    let myData = JSON.parse(data);
    if (req.params.id < 0 || req.params.id >= myData.length) {
      res.set('Content-Type', 'text/plain');
      res.sendStatus(404);
    } else {
      if (req.body.age) {
        myData[req.params.id].age = req.body.age;
      }
      if (req.body.kind) {
        myData[req.params.id].kind = req.body.kind;
      }
      if (req.body.name) {
        myData[req.params.id].name = req.body.name;
      }
      let returnData = myData[req.params.id];
      myData = JSON.stringify(myData);
      fs.writeFile('pets.json', myData, (err) => {});
      res.set('Content-Type', 'application/json');
      res.send(returnData);
    }
  });
});

app.delete('/pets/:id', function(req, res) {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    let myData = JSON.parse(data);
    if (req.params.id < 0 || req.params.id >= myData.length) {
      res.set('Content-Type', 'text/plain');
      res.sendStatus(404);
    } else {
      myData = myData.splice(req.params.id, 1);
      myData = JSON.stringify(myData);
      res.set('Content-Type', 'application/json');
      res.send(myData);
    }
  });
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
