var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/jobu', [ 'employees' ]);
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
			res.json(employee);
		}
	});
});
/* register a new employee */
router.post('/registerEmployee', function(req, res, next) {
	var employee = req.body.employee;
	db.collection('employees').insert(employee, function(error, record){
		if (error) {
			res.json(error);
		} else {
			res.json(record);
		}
	});
});

/* login with employee creds */
router.post('/loginEmployee', function(req, res, next) {
	var uName = req.body.userName;
	var password = req.body.password;
    console.log('authenticating %s:%s', uName, password);
    db.employees.findOne({
    	userName: uName
    },
    function (err, record) {
        if (record) {
            if (err) res.status(500).send({ error: 'Authentication Failed'});
            if(password == record.password) res.json({'authStatus':'success'});
            if(password != record.password){
            	res.status(500).send({ error: 'Username and Password mismatch'});
            }
        } else {
        	res.status(500).send({ error: 'Bad Credentials'});
        }
    });
});


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
		db.employees.update(
		{_id : employee.userName}, updObj , {}, function(err, record) {
			if (err) {
				console.log("error");
				res.send(err);
			} else {
				console.log("success");
				res.json(employee);
			}
		});
	}
});


/* DELETE a Todo */

router.delete('/delete', function(req, res) {
	var user = req.body.person;
	db.users.remove({
		id : Number(user.id)
	}, '', function(err, result) {
		if (err) {
			res.send(err);
		} else {
			return res.json(user);
		}
	});
});


module.exports = router;