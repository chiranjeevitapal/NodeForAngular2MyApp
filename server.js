var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var users = require('./routes/users');
var users = require('./routes/employee');
cors = require('./cors');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
var server = app.listen(5000, function() {
	var host = 'localhost';
	var port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});
module.exports = app;