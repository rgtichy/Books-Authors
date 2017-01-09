(function(){
  console.log('~+~o~+~o~+~o~+~o~+~o~+~o~+~o~+~')
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var formatted = dt.format('Y-m-d H:M:S');
  console.log(formatted)
})();

var express = require("express");
var app = express();

app.use(express.static(__dirname + '/client'));

var bp = require("body-parser");

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

var routes = require('./routes');
routes(app);

app.listen(8000);
