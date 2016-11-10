'use strict';
var https = require('https');
var http = require('http');
var cors = require('./cors');
var fs = require('fs');
var express = require('express');
var app = express();

app.use(cors());

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var employee = require('./routes/employee');

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
	extended : true
})); // support encoded bodies

app.use('/api/', employee);

// This line is from the Node.js HTTPS documentation.
var options = {
	key : fs.readFileSync(__dirname + '/certs/server/key.pem'),
	cert : fs.readFileSync(__dirname + '/certs/server/cert.pem')
};

// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);