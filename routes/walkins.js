var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var db = mongojs('mongodb://localhost:27017/jobu', ['walkins']);
var collection = db.collection('walkins');
var todaywalkinsScraper = require('../utils/todaywalkinsScraper.js');
var mailSender = require('../utils/mailSender.js');
var capture = require('../utils/capture.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


/* Get all walkins */
router.get('/walkinsAll/:offset/:limit/:sortBy/:sortType', function(req, res,
    next) {
    var sortType = req.params.sortType == 'ASC' ? 1 : -1;
    var sortBy = req.params.sortBy;
    var sortObject = {};

    sortObject[sortBy] = sortType;
    collection.find().sort(sortObject).skip(Number(req.params.offset)).limit(
        Number(req.params.limit)).toArray(function(err, walkins) {
        if (err) {
            res.send(err);
        } else {
            collection.find().count(function(err, count) {
                if (!err) {
                    res.setHeader('X-Total-Count', count);
                    res.json(walkins);
                }
            })

        }
    });
});

/* Get all walkins */
router.get('/walkinsAll', function(req, res,
    next) {

    collection.find({}).toArray(function(err, walkins) {
        if (err) {
            res.send(err);
        } else {
            collection.find().count(function(err, count) {
                if (!err) {
                    capture.captureDetails(req);
                    res.setHeader('X-Total-Count', count);
                    res.json(walkins);
                }
            })

        }
    });
});

router.post('/postWalkin', function(req, res, next) {
    var walkin = req.body.walkin;
    collection.insert(walkin,
        function(error, record) {
            if (error) {
                res.json(error);
            } else {
                res.json(record);
            }
        });
});


// Login
router.get('/loginUser', function(req, res) {
    res.render('loginUser');
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: true
}, function(req, username, password, done) {
    getUserByUsername(username, function(err, user) {
        if (err)
            throw err;
        if (!user) {
            return done(null, false, {
                message: 'Unknown user'
            });
        }

        comparePassword(password, user.password, function(err, isMatch) {
            if (err)
                throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
        });
    });
}));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.email);
    // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(email, done) {
    db.collection('credentials').findById(email, function(err, user) {
        done(err, email);
    });
});

getUserByUsername = function(username, callback) {
    var query = {
        email: username
    };
    db.collection('credentials').findOne(query, callback);
}

comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err)
            throw err;
        callback(null, isMatch);
    });
}

router.post('/loginUser', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.json({
                code: 500,
                error: info.message
            });
        }
        if (!user) {
            return res.json({
                code: 500,
                error: info.message
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.json({
                    code: 500,
                    error: info.message
                });
            } else {
                return res.json(user);
            }
        });
    })(req, res, next);
});


router.post('/registerUser', function(req, res, next) {
    var user = req.body.register;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            db.collection('credentials').insert(user,
                function(error, record) {
                    if (error) {
                        res.json(error);
                    } else {
                        //url = 'Please <a href="http://localhost:8090/api/confirm/' + user.email + '">click</a> to complete your registration';
                        //mailSender.sendMail(user.email, url);
                        res.json(record);
                    }
                });
        });
    });

});

router.get('/confirm/:email', function(req, res, next) {
    var email = req.params.email;
    db.collection('credentials').update({
        _id: email
    }, {
        $set: {
            active: true
        }
    }, function(err, result) {
        if (err) {
            res.writeHead(500, {
                "Content-Type": "text/plain"
            });
            res.end("Confirmation failed");
        } else {
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            res.end("Your account is verified successfully.");
        }
    });
});


router.get('/scrape/:website/:link', function(req, res) {
    var website = req.params.website;
    var link = req.params.link;
    if (website == 'todaywalkins') {
        todaywalkinsScraper.scrape(res, link);
    }
})

router.get('/scrapeTodayUrls', function(req, res) {
    todaywalkinsScraper.scrapeTodayUrls(res);
})
module.exports = router;
