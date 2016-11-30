var schedule = require('node-schedule');
var currentWeekNumber = require('current-week-number');
var scheduleCheckinsByFrequency = require('./scheduleCheckin');
var timeToCompare = require('./timeToCompare');
var getToken = require('./generateToken');

// var test = schedule.scheduleJob('07-20 * * *', function () {

var test = schedule.scheduleJob('* * * * *', function () {
    var dayAndTime = timeToCompare();
    // CREATES records for all participants in checkins.answers array for checkins 
    // that have time field equal to  dayAndTime.time (which is the moment of envocation this function)
    // also SENDS emails to participants with invitation to answer
    scheduleCheckinsByFrequency(dayAndTime.dayOfWeekString, dayAndTime.time);
});

module.exports = {
    test: test
};