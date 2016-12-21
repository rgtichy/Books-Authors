var express = require("express");
var app = express();

var bp = require("body-parser");

app.use(bp.json());

var routes = require('./routes');
routes(app);

app.listen(8000);