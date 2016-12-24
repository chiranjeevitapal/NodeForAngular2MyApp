var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jobu');
var db = mongoose.connection;

var employee = require('./routes/employee');
var uploader = require('./routes/uploader');
var walkins = require('./routes/walkins');

// Init App
var app = express();
// app.use(cors());

/*
 * const corsOptions = { "origin" : "http://localhost:3000", "methods" :
 * "GET,HEAD,PUT,PATCH,POST,DELETE", "preflightContinue" : false, "credentials" :
 * true }
 *
 * app.use(cors(corsOptions))
 */

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin',
			'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers',
			'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('access-control-expose-headers', 'X-Total-Count');
	next();
});

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(cookieParser());

// Express Session
app.use(session({
	secret : 'secret',
	saveUninitialized : true,
	resave : true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app
		.use(expressValidator({
			errorFormatter : function(param, msg, value) {
				var namespace = param.split('.'), root = namespace.shift(), formParam = root;

				while (namespace.length) {
					formParam += '[' + namespace.shift() + ']';
				}
				return {
					param : formParam,
					msg : msg,
					value : value
				};
			}
		}));

// Global Vars
/*
 * app.use(function (req, res, next) { res.locals.success_msg =
 * req.flash('success_msg'); res.locals.error_msg = req.flash('error_msg');
 * res.locals.error = req.flash('error'); res.locals.user = req.user || null;
 * next(); });
 */

app.use('/api/', employee);
app.use('/api/', uploader);
app.use('/api/', walkins);

// Set Port
app.set('port', (process.env.PORT || 80));

app.listen(app.get('port'), function() {
	console.log('Server started on port ' + app.get('port'));
});
