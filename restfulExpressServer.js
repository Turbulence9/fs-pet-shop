const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.post('/pets', function (req, res) {
  fs.readFile('pets.json','utf8', (err, data) => {
    let myData = JSON.parse(data);
    myData.push(req.body);
    myData = JSON.stringify(myData);
    fs.writeFile('pets.json',myData, (err) => {});
    res.set('Content-Type', 'application/json');
    res.send('simmerDown');
  });
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
