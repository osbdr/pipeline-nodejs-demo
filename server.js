
var express = require('express');
var app = express();

module.exports = app.listen(3000, function () {
    console.log('Ready for connections (Port: 3000)');
});

app.get('/', function (req, res) {
  res.send('Hello!');
});

app.get('/xss', function (req, res) {
  res.send(req.query.id);
});


