var express = require('express');
var multer = require('multer');
var fs = require('fs');
var app = express();
var router = express.Router();

var DIR = 'C:/Temp/';

var resumeStorage = multer.diskStorage({
	destination : function(req, file, cb) {
		cb(null, DIR)
	},
	filename : function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now()+'.doc')
	}
})

var uploadResume = multer({
	storage : resumeStorage
}).single('file');

router.post('/uploadResume', function(req, res) {
	uploadResume(req, res, function(err) {
		if (err) {
			return res.end(err.toString());
		}
		res.end('File is uploaded');
	})
});

module.exports = router;