var request = require('request');
var cheerio = require('cheerio');

function scrape(res, link) {
    url = 'http://www.todaywalkins.com/' + link + '.aspx';
    request(url, function(error, response, html) {
        if (error) {
            res.send(error);
        } else {
            var regex = /<br\s*[\/]?>/gi;
            html = html.replace(regex, "\n");
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
                    var textDetail = $(p).find('strong').text();
                    var textNode = p.nextSibling;
                    var text = textNode.nodeValue;
                    if (textDetail.indexOf('Company Profile') != -1) {
                        walkin.companyProfile = text.trim();
                    }
                    if (textDetail.indexOf('Job Description') != -1) {
                        walkin.jobDescription = text.trim();
                    }
                    if (textDetail.indexOf('Job Requirement') != -1) {
                        walkin.jobRequirements = text.trim();
                    }
                    if (textDetail.indexOf('Candidate Profile') != -1) {
                        walkin.candidateProfile = text.trim();
                    }
                    if (textDetail.indexOf('Venue Details') != -1) {
                        walkin.contactDetails = text.trim();
                    }
                    if (textDetail.indexOf('Contact Details') != -1) {
                        walkin.contactDetails += ",  " + text.trim();
                    }
                    if (textDetail.indexOf('Contact Person') != -1) {
                        walkin.contactDetails += ", Contact Person: " + text.trim();
                    }
                    count++;
                });
            });

            $('#apply01').filter(function() {
                walkin.howToApply = $(this).find('a').attr('href');
            })
            res.json(walkin);
        }
    });
}

module.exports.scrape = scrape;
