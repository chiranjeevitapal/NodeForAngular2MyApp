var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/jobu', [ 'walkins' ]);
/* Get all walkins */
router.get('/walkinsAll/:offset/:limit/:sortBy/:sortType', function(req, res, next) {
	var collection = db.collection('walkins');
	var sortType = req.params.sortType == 'ASC' ? 1 : -1;
	var sortBy = req.params.sortBy;
	var sortObject = {};
	
	sortObject[sortBy] = sortType;
	collection.find().sort(sortObject).skip(Number(req.params.offset)).limit(Number(req.params.limit)).toArray(function(err, walkins) {
		if (err) {
			res.send(err);
		} else {
			res.setHeader('X-Total-Count', 3);
			res.json(walkins);
		}
	});
});


module.exports = router;