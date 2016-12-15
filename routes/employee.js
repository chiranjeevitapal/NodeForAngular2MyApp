var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var db = mongojs('mongodb://localhost:27017/jobu', [ 'employees' ]);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* Get all users */
router.get('/employees', function(req, res, next) {
	var collection = db.collection('employees');
	collection.find({}).toArray(function(err, employees) {
		if (err) {
			res.send(err);
		} else {
			res.json(employees);
		}
	});
});
/* GET One Todo with the provided ID */
router.get('/employeeDetail/:userName', function(req, res, next) {
	var userName = req.params.userName;
	db.employees.findOne({
		// _id : mongojs.ObjectId(req.params.email)
		_id : userName
	}, function(err, employee) {
		if (err) {
			res.send(err);
		} else {
			if (null != employee) {
				res.json(employee);
			} else {
				return res.json({
					code : 500,
					error : "no employee found"
				});
			}
		}
	});
});
/* register a new employee */
router.post('/registerEmployee', function(req, res, next) {
	var employee = req.body.employee;
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(employee.password, salt, function(err, hash) {
			employee.password = hash;
			db.collection('employees').insert(employee,
					function(error, record) {
						if (error) {
							res.json(error);
						} else {
							res.json(record);
						}
					});
		});
	});

});

// Login
router.get('/loginEmployee', function(req, res) {
	res.render('loginEmployee');
});

passport.use(new LocalStrategy({
	usernameField : 'userName',
	passwordField : 'password',
	passReqToCallback : true,
	session : true
}, function(req, username, password, done) {
	getUserByUsername(username, function(err, user) {
		if (err)
			throw err;
		if (!user) {
			return done(null, false, {
				message : 'Unknown employee'
			});
		}

		comparePassword(password, user.password, function(err, isMatch) {
			if (err)
				throw err;
			if (isMatch) {
				return done(null, user);
			} else {
				return done(null, false, {
					message : 'Invalid password'
				});
			}
		});
	});
}));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
	done(null, user.userName);
	// where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(userName, done) {
	db.collection('employees').findById(userName, function(err, user) {
		done(err, userName);
	});
});

getUserByUsername = function(username, callback) {
	var query = {
		userName : username
	};
	db.collection('employees').findOne(query, callback);
}

comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if (err)
			throw err;
		callback(null, isMatch);
	});
}

router.post('/loginEmployee', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return res.json({
				code : 500,
				error : info.message
			});
		}
		if (!user) {
			return res.json({
				code : 500,
				error : info.message
			});
		}
		req.logIn(user, function(err) {
			if (err) {
				return res.json({
					code : 500,
					error : info.message
				});
			} else {
				return res.json(user);
			}
		});
	})(req, res, next);
});

/* login with employee creds */
/*
 * router.post('/loginEmployee', function(req, res, next) { var uName =
 * req.body.userName; var password = req.body.password;
 * console.log('authenticating %s:%s', uName, password); db.employees.findOne({
 * userName: uName }, function (err, record) { if (record) { if (err)
 * res.status(500).send({ error: 'Authentication Failed'}); if(password ==
 * record.password) res.json({'authStatus':'success'}); if(password !=
 * record.password){ res.status(500).send({ error: 'Username and Password
 * mismatch'}); } } else { res.status(500).send({ error: 'Bad Credentials'}); }
 * }); });
 */

/* PUT/UPDATE a user */
router.put('/updateEmployee', function(req, res, next) {
	var employee = req.body.employee;
	var updObj = {};
	if (employee.isCompleted) {
		updObj.isCompleted = employee.isCompleted;
	}
	if (employee.text) {
		updObj.text = employee.text;
	}
	if (!updObj) {
		res.status(400);
		res.json({
			"error" : "Invalid Data"
		});
	} else {
		updObj = employee;
		delete updObj["_id"];
		db.employees.update({
			_id : employee.userName
		}, updObj, {}, function(err, record) {
			if (err) {
				res.send(err);
			} else {
				res.json(employee);
			}
		});
	}
});

/* DELETE a Todo */


module.exports = router;