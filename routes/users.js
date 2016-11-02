var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', [ 'users' ]);
/* Get all users */
router.get('/users', function(req, res, next) {
	var collection = db.collection('users');
	collection.find({}).toArray(function(err, users) {
		if (err) {
			res.send(err);
		} else {
			res.json(users);
		}
	});
});
/* GET One Todo with the provided ID */
router.get('/todo/:id', function(req, res, next) {
	db.todos.findOne({
		_id : mongojs.ObjectId(req.params.id)
	}, function(err, todos) {
		if (err) {
			res.send(err);
		} else {
			res.json(todos);
		}
	});
});
/* POST/SAVE a Todo */
router.post('/todo', function(req, res, next) {
	var todo = req.body;
	if (!todo.text || !(todo.isCompleted + '')) {
		res.status(400);
		res.json({
			"error" : "Invalid Data"
		});
	} else {
		db.todos.save(todo, function(err, result) {
			if (err) {
				res.send(err);
			} else {
				res.json(result);
			}
		})
	}
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