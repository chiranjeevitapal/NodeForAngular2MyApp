var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var db = mongojs('mongodb://localhost:27017/jobu', ['walkins']);
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
                    res.setHeader('X-Total-Count', count);
                    res.json(walkins);
                }
            })

        }
    });
});

router.post('/postWalkin', function(req, res, next) {
    var walkin = req.body.walkin;
    console.log(walkin);
    collection.insert(walkin,
        function(error, record) {
            if (error) {
                res.json(error);
            } else {
                res.json(record);
            }
        });
});


router.get('/scrape/:website/:link', function(req, res) {
    var website = req.params.website;
		var link = req.params.link;
    if (website == 'todaywalkins') {
				url = 'http://www.todaywalkins.com/'+link+'.aspx';
        request(url, function(error, response, html) {
					if(error){
						res.send(error);
					}else{
                var $ = cheerio.load(html);
                var title, release, rating;
                var walkin = {
                    title: "",
                    company: "",
                    website: "",
                    position: "",
                    eligibility: "",
                    experience: "",
                    salary: "",
                    location: "",
                    walkinDate: "",
                    walkinTime: "",
                    date: "",
                    skills: "",
                    jobDescription: "",
                    jobRequirements: "",
                    candidateProfile: "",
                    lastDate: "",
                    companyProfile: "",
                    howToApply: "",
                    contactDetails: ""
                }
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var today = dd + '/' + mm + '/' + yyyy;
                walkin.date = today;
                $('.job-title').filter(function() {
                    var data = $(this);
                    title = data.text();
                    walkin.title = title;
                })
                $('.detail-container').filter(function() {
                    $('.detail-container .job-row').each(function() {
                        var data = $(this).find('.right').text();
												var dataKey = $(this).find('.left').text();
                        if (dataKey.indexOf('Company') != -1) {
                            walkin.company = data;
                        }
                        if (dataKey.indexOf('Website') != -1) {
                            walkin.website = data;
                        }
                        if (dataKey.indexOf('Job Role') != -1) {
                            walkin.position = data;
                        }
                        if (dataKey.indexOf('Eligibility') != -1) {
                            walkin.eligibility = data;
                        }
                        if (dataKey.indexOf('Experience') != -1) {
                            walkin.experience = data;
                        }
                        if (dataKey.indexOf('Salary') != -1) {
                            walkin.salary = data;
                        }
                        if (dataKey.indexOf('Location') != -1) {
                            walkin.location = data;
                        }
                        if (dataKey.indexOf('Walk-In Date') != -1) {
                          walkin.walkinDate = data;
                        }
												if (dataKey.indexOf('Last Date') != -1) {
													walkin.lastDate = data;
												}
                        if (dataKey.indexOf('Walk-In Time') != -1) {
                            walkin.walkinTime = data;
                        }
                    });
                });
                $('.detail-container').each(function() {
                    var count = 0;
                    $('.detail-container p').each(function() {
                        var p = $(".detail-container p")[count];
												var textDetail = $(p).find('strong').text().trim();
                        var textNode = p.nextSibling;
                        var text = textNode.nodeValue.trim();
                        if (textDetail.indexOf('Company Profile') != -1) {
                            walkin.companyProfile = text;
                        }
                        if (textDetail.indexOf('Job Description') != -1) {
                            walkin.jobDescription = text;
                        }
                        if (textDetail.indexOf('Job Requirement') != -1) {
                            walkin.jobRequirements = text;
                        }
                        if (textDetail.indexOf('Candidate Profile') != -1) {
                            walkin.candidateProfile = text;
                        }
                        if (textDetail.indexOf('Venue Details') != -1) {
                            walkin.contactDetails = text;
                        }
                        if (textDetail.indexOf('Contact Details') != -1) {
                            walkin.contactDetails += ",  " + text;
                        }
                        count++;
                    });
                });
									res.json(walkin);
            }
        });
    }
})
module.exports = router;
