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
var expressStaticGzip = require("express-static-gzip");
var compression = require('compression');

mongoose.connect('mongodb://localhost:27017/jobu');
var db = mongoose.connection;

var uploader = require('./routes/uploader');
var walkins = require('./routes/walkins');
var authentication = require('./routes/authentication');

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

app.use(compression());
app.use("/", expressStaticGzip("client"));

//app.use(express.static(path.join(__dirname, 'client')));
//URL Rewriting - start

app.get('/walkinshub', function(request, response, next) {
    //app.use(express.static(path.join(__dirname, 'client')))
    //app.use("/", expressStaticGzip("client"));
    //request.url = '/#/walkinshub';
    //next();
    response.sendFile(path.join(__dirname, 'client', 'walkinshub.html'));
});

app.get('/home', function(request, response, next) {
    //app.use(express.static(path.join(__dirname, 'client')))
    app.use("/", expressStaticGzip("client"));
    request.url = '/#/home';
    next();
});

app.get('/uploadChethan', function(request, response, next) {
    //app.use(express.static(path.join(__dirname, 'client')))
    app.use("/", expressStaticGzip("client"));
    request.url = '/#/uploadChethan';
    next();
});
app.get('/postJob', function(request, response, next) {
    //app.use(express.static(path.join(__dirname, 'client')))
    app.use("/", expressStaticGzip("client"));
    request.url = '/#/postJob';
    next();
});
app.get('/jobseekers', function(request, response, next) {
    //app.use(express.static(path.join(__dirname, 'client')))
    app.use("/", expressStaticGzip("client"));
    request.url = '/#/jobseekers';
    next();
});
app.get('/profile', function(request, response, next) {
    //app.use(express.static(path.join(__dirname, 'client')))
    app.use("/", expressStaticGzip("client"));
    request.url = '/#/profile';
    next();
});
app.get('/tutorials', function(request, response, next) {
    //app.use(express.static(path.join(__dirname, 'client')))
    app.use("/", expressStaticGzip("client"));
    request.url = '/#/tutorials';
    next();
});

app.get('/walkin/:id', function(request, response, next) {
    //app.use(express.static(path.join(__dirname, 'client')))
    app.use("/", expressStaticGzip("client"));
    request.url = '/#/walkin/:id';
    next();
});

app.get('/**', function(request, response, next) {
    if (request.url.indexOf("/api/") == -1) {
        //app.use(express.static(path.join(__dirname, 'client')))
        app.use("/", expressStaticGzip("client"));
        request.url = '/#/home';
    }
    next();
});
//URL Rewriting - end



/*app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin',
        '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});*/

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app
    .use(expressValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.'),
                root = namespace.shift(),
                formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
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

app.use('/api/', uploader);
app.use('/api/', walkins);
app.use('/api/', authentication);

// Set Port
app.set('port', (process.env.PORT || 80));

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
