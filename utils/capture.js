var fs = require('fs');

//get user ip address
function captureDetails(req){
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var m_names = new Array("Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec");
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    var curr_hours = d.getHours();
    var curr_minutes = d.getMinutes();
    var curr_seconds = d.getSeconds();

    var outputString = (curr_date + "-" + m_names[curr_month] +
        "-" + curr_year + " / " + curr_hours + "h " + curr_minutes + "m " + curr_seconds + "s -- IP " + ip);
    if(ip.indexOf("49.206.202.208") != -1){
        fs.appendFile("logins.log", outputString+"\n", function(err) {
            if (err) {
                return console.log(err);
            }
        });
    }
};

module.exports.captureDetails = captureDetails;
