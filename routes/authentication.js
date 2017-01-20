var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var bcrypt = require('bcryptjs');
var db = mongojs('mongodb://localhost:27017/jobu', ['fbusers']);
var User = db.collection('fbusers');

/* User Login/Registration */
router.post('/facebookAuth', function(req, res, next) {
    var user = req.body.user;
    // find the user in the database based on their facebook id
    User.find({
        'fb_id': user.fb_id
    }, function(err, jobseeker) {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) {
            console.log("error connecting to the database");
            res.send(err);
        } else {
            // if the user is found, No need of registration
            if (jobseeker == null || jobseeker == '') {
              console.log("User Not Found. Registering..." + jobseeker);
                User.insert(user,
                    function(error, record) {
                        if (error) {
                            res.json(error);
                        } else {
                            res.json(record);
                        }
                    });
            } else {
                console.log("User Found. No need of registration." + jobseeker);
                res.send(jobseeker);
            }
        }
    });
});

module.exports = router;
