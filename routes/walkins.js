var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/jobu', [ 'walkins' ]);
var collection = db.collection('walkins');
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
					res.setHeader('X-Total-Count', count );
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

module.exports = router;
