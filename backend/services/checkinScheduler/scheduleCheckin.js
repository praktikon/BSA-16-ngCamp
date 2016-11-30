var sendEmailToCheckinPartisipants = require('./sendEmail');
var repo = require('../../repositories/checkinRepository');
var getToken = require('./generateToken');
var tokenRepo = require('./tokens');

function scheduleCheckinsByFrequency(frequency, time) {
    
    repo.findCheckinsByFrequencyAndTime(frequency, time, function (err, checkins) {
        checkins.forEach(function (checkin) {
            addCheckinsAnswersArrayFieldsAndSendsEmail(checkin);
        })
    });
}

function addCheckinsAnswersArrayFieldsAndSendsEmail(checkin) {
    tokenRepo.getTokens(checkin._id);
    var date = Date.now();
    var question = checkin.question;
    var projectName = checkin.project.title;                   
    if (checkin.participants.length > 0) {
        checkin.participants.forEach(function (participantId) {
            var token = getToken();
            sendEmailToCheckinPartisipants(participantId, question, projectName, checkin._id, token);
            checkin.answers.push({ 
                user: p, 
                answer: 'noAnswer', 
                creationDate: date, 
                editedDate: date, 
                token: token 
            });
        });
        checkin.save(function (err, result) {
            if (err) {
                tokenRepo.clearTokens();
                console.log(err);
            } else {
                tokenRepo.clearTokens();
            }
        });
    }   
}

module.exports = scheduleCheckinsByFrequency