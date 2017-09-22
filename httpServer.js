const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url.slice(1).includes('pets')) {
    let url = req.url.slice(1).split('/');
    fs.readFile('./pets.json', 'utf8', (err, data) => {
      let myData = data;
      if (url.length === 2) {
        myData = JSON.parse(data);
        myData = myData[url[1]];
        myData = JSON.stringify(myData);;
      }
      console.log(myData);
      if (!myData || url.length > 2) {
        res.statusCode =404;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Not Found");
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(myData);
      }
    });
  } else {
    res.statusCode =404;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Not Found");
  }
});

server.listen(3000);

module.exports = server;
