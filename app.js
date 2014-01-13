var express = require('express'),
    log = require('log4js');

// setup logger
var logger = log.getLogger('App');
logger.setLevel('Info');

var app = express();

app.get('/movies', function(req, res){
  var body = 'Hello world';
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify( {a:1}));
});

app.listen(8888);
logger.info("Listening using port 8888");
