var schedule = require('node-schedule');
var currentWeekNumber = require('current-week-number');
var scheduleCheckinsByFrequency = require('./scheduleCheckin');
var timeToCompare = require('./timeToCompare');

var getToken = require('./generateToken');


var test = schedule.scheduleJob('07-20 * * *', function () {
    var dayAndTime = timeToCompare();
    scheduleCheckinsByFrequency(dayAndTime.dayOfWeekString, dayAndTime.time);
    
});


module.exports = {
    test: test
};