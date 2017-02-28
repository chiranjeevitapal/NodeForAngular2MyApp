var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID;
var cheerio = require('cheerio');
var request = require('request');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var db = mongojs('mongodb://localhost:27017/jobu', ['walkins']);
var collection = db.collection('walkins');
var fbusersCollection = db.collection('fbusers');
var todaywalkinsScraper = require('../utils/todaywalkinsScraper.js');
var mailSender = require('../utils/mailSender.js');
var capture = require('../utils/capture.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sm = require('sitemap');
var walkinUrls = [{
    url: '/tutorials/'
}];

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
                    //res.setHeader('Cache-Control', 'public, max-age=31557600');
                    res.setHeader('Cache-Control', 'no-cache');
                    res.json(walkins);
                }
            })

        }
    });
});


var sitemap = sm.createSitemap({
    hostname: 'http://www.walkinshub.com',
    cacheTime: 600000, // 600 sec - cache purge period
    urls: this.walkinUrls
});

router.get('/sitemap.xml', function(req, res) {
    var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
        'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" ' +
        'xmlns:xhtml="http://www.w3.org/1999/xhtml" ' +
        'xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" ' +
        'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ' +
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';


    collection.find({}).toArray(function(err, walkins) {
        if (err) {
            res.send(err);
        } else {
            //res.json(walkins);
            walkins.forEach(function(walkin) {
                var companyName = walkin.company.replace(/[^a-zA-Z0-9_-]/g,'-');
                xml += '<url><loc>http://www.walkinshub.com/walkin/' + companyName + '-' + walkin._id + '</loc><changefreq>daily</changefreq></url>';
            });
            xml += '<url><loc>http://www.walkinshub.com/tutorials/</loc><changefreq>daily</changefreq></url>'+
            '<url><loc>http://www.walkinshub.com/</loc><changefreq>daily</changefreq></url></urlset>'
            setTimeout(function() {
                res.header('Content-Type', 'application/xml');
                res.send(xml);
            }, 2000);
        }
    });
});

/* Get all jobseekers */
router.get('/jobseekers', function(req, res,
    next) {

    fbusersCollection.find({}).toArray(function(err, jobseekers) {
        if (err) {
            res.send(err);
        } else {
            res.json(jobseekers);
        }
    });
});

/* Get all jobseekers */
router.get('/jobseeker/:id', function(req, res,
    next) {
    var id = req.params.id;
    fbusersCollection.find({
        fb_id: "" + id
    }, function(err, jobseeker) {
        if (err) {
            res.send(err);
        } else {
            if (null != jobseeker) {
                res.json(jobseeker);
            } else {
                return res.json({
                    code: 500,
                    error: "Information not available."
                });
            }
        }
    });
});

router.get('/todayVisitors', function(req, res, next) {
    capture.readDetails(res);
})

/* GET One Walkin with the provided ID */
router.get('/walkin/:id', function(req, res, next) {
    var id = req.params.id.substring(req.params.id.lastIndexOf('-') + 1);
    //var id = req.params.id;
    collection.find({
        _id: ObjectId("" + id)
    }, function(err, walkin) {
        if (err) {
            res.send(err);
        } else {
            if (null != walkin) {
                capture.captureDetails(req);
                res.json(walkin);
            } else {
                return res.json({
                    code: 500,
                    error: "Walkin details not available."
                });
            }
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

/* update Profile */
router.put('/updateprofile', function(req, res, next) {
    var profile = req.body.profile;
    fbusersCollection.update({
            'fb_id': profile.fb_id
        }, {
            $set: {
                'fb_first_name': profile.fb_first_name,
                'fb_last_name': profile.fb_last_name,
                'fb_email': profile.fb_email,
                'fb_phone': profile.fb_phone,
                'fb_qualification': profile.fb_phone,
                'fb_experience': profile.fb_experience,
                'fb_about': profile.fb_about,
                'fb_skills': profile.fb_skills,
                'fb_location': profile.fb_location
            }
        },
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
});

router.post('/postbyrecuiter', function(req, res, next) {
    var walkin = req.body.walkin;
    var html = '';
    html = html + '<p>Company: ' + walkin.company + '</p>' +
        '<p>companyProfile: ' + walkin.companyProfile + '</p>' +
        '<p>website: ' + walkin.website + '</p>' +
        '<p>title: ' + walkin.title + '</p>' +
        '<p>position: ' + walkin.position + '</p>' +
        '<p>location: ' + walkin.location + '</p>' +
        '<p>eligibility: ' + walkin.eligibility + '</p>' +
        '<p>experience: ' + walkin.experience + '</p>' +
        '<p>jobDescription: ' + walkin.jobDescription + '</p>' +
        '<p>walkinDate: ' + walkin.walkinDate + '</p>' +
        '<p>walkinTime: ' + walkin.walkinTime + '</p>' +
        '<p>salary: ' + walkin.salary + '</p>' +
        '<p>howToApply: ' + walkin.howToApply + '</p>' +
        '<p>contactDetails: ' + walkin.contactDetails + '</p>' +
        '<p>email: ' + walkin.email + '</p>' +
        '<p>date: ' + new Date() + '</p>';
    mailSender.sendMail(walkin.email,
        "walkinshubindia@gmail.com", 'Recruiter Post',
        'Email from recuiter', html);
    res.json("success");
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

router.get('/scrapeTodayUrls/:website', function(req, res) {
    var website = req.params.website;
    if (website == 'todaywalkins') {
        todaywalkinsScraper.scrapeTodayUrls(res);
    }
})

/* Get registered fb subscribers */
router.get('/fbsubscribers', function(req, res,
    next) {
    fbusersCollection.find({}).toArray(function(err, fbsubscribers) {
        if (err) {
            res.send(err);
        } else {
            fbsubscribers.forEach(function(subscriber) {
                console.log(subscriber.fb_email);
            })
            res.json(fbsubscribers);
        }
    });
});


/* Push notifications to registered fb subscribers */
router.get('/notifyfbsubscribers', function(req, res,
    next) {

    var html = '<html> <head></head><body><table style="border: 1px solid black;">' +
        '<thead>' +
        '<tr><th style="border: 1px solid black;">Company</th>' +
        '<th style="border: 1px solid black;">Role</th>' +
        '<th style="border: 1px solid black;">Experience</th>' +
        '<th style="border: 1px solid black;">Location</th>' +
        '<th style="border: 1px solid black;">Details</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';

    collection.find({}).toArray(function(err, walkins) {
        var obj = [];
        var today = new Date();
        var todayDateString = today.yyyymmdd();
        if (err) {
            res.send(err);
        } else {
            walkins.forEach(function(walkin) {
                if (todayDateString == walkin.date.substring(0, walkin.date.indexOf('T'))) {
                    //obj.push(walkin);
                    var companyName = walkin.company.replace(/[^a-zA-Z0-9_-]/g,'-');
                    html = html + '<tr><td style="border: 1px solid black;">' + walkin.company + '</td>' +
                        '<td style="border: 1px solid black;">' + walkin.title + '</td>' +
                        '<td style="border: 1px solid black;">' + walkin.experience + '</td>' +
                        '<td style="border: 1px solid black;">' + walkin.location + '</td>' +
                        '<td style="border: 1px solid black;"><a href="www.walkinshub.com/walkin/' + companyName + '-' + walkin._id + '"> Details </a></td></tr>';
                }
            })
            html = html + '</tbody></table></body></html>'
            fbusersCollection.find({}).toArray(function(err, fbsubscribers) {
                if (err) {
                    res.send(err);
                } else {
                    fbsubscribers.forEach(function(subscriber, i) {
                        setTimeout(function() {
                            if (subscriber.fb_email != '' && subscriber.fb_email != undefined && subscriber.fb_email != null) {
                                mailSender.sendMail('"www.walkinshub.com" <walkinshubindia@gmail.com>', subscriber.fb_email, 'Today Walkin Interviews', 'Here is th list of interviews that are posted on walkinshub.com today', html);
                            }
                        }, (i + 1) * 5000);
                    })
                }
            })
            res.json("Emails triggered.");
        }
    });
});

router.post('/bulkmailer', function(req, res, next) {
    var message = req.body.message;
    var html = '';
    fbusersCollection.find({}).toArray(function(err, fbsubscribers) {
        if (err) {
            res.send("failed");
        } else {
            fbsubscribers.forEach(function(subscriber, i) {
                html = '';
                html = html + '<p>' + message + '</p>'
                setTimeout(function() {
                    if (subscriber.fb_email != '' && subscriber.fb_email != undefined && subscriber.fb_email != null) {
                        mailSender.sendMail('"www.walkinshub.com" <walkinshubindia@gmail.com>', subscriber.fb_email, 'Message from Walkinshub', '', html);
                    }
                }, (i + 1) * 5000);
            })
            res.json("success");
        }
    })
});

/* get today walkins data */
router.get('/todaywalkinsdata', function(req, res,
    next) {
    collection.find({}).toArray(function(err, walkins) {
        var obj = [];
        var today = new Date();
        var todayDateString = today.yyyymmdd();
        if (err) {
            res.send(err);
        } else {
            walkins.forEach(function(walkin) {
                if (todayDateString == walkin.date.substring(0, walkin.date.indexOf('T'))) {
                    obj.push(walkin);
                }
            })
            res.json(obj);
        }
    });
});

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
};

module.exports = router;
