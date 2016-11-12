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
router.get('/employeeDetail/:email', function(req, res, next) {
	console.log('email :::: '+req.params.email);
	var email = req.params.email;
	db.employees.findOne({
		//_id : mongojs.ObjectId(req.params.email)
		_id : email
	}, function(err, employee) {
		if (err) {
			res.send(err);
		} else {
			res.json(employee);
		}
	});
});
/* register a new employee*/
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


/* PUT/UPDATE a user */
router.put('/update', function(req, res, next) {
	var user = req.body.person;

	var updObj = {};
	if (user.isCompleted) {
		updObj.isCompleted = user.isCompleted;
	}
	if (user.text) {
		updObj.text = user.text;
	}
	if (!updObj) {
		res.status(400);
		res.json({
			"error" : "Invalid Data"
		});
	} else {
		updObj = user;
		delete updObj["_id"];
		db.users.update({
			id : Number(user.id)
		}, updObj, {}, function(err, result) {
			if (err) {
				res.send(err);
			} else {
				return res.json(user);
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