var userRepository = require('../../repositories/userRepository');
var mailer = require('../mailer/index');
var path = require('path');
var host = require("../../config").host;

function sendEmailToCheckinPartisipants(participantId, question, projectName, checinId,  token) {
    var mailTemplatePath = path.resolve(__dirname+'/../../../'+'email/checkIn-notification-template.pug');
    userRepository.getById(participantId, function(err, data) {
        if(err) {
            console.log(err);
            } else {
                var username = data.firstName + ' ' + data.lastName ;
                var mailPost = {
                    to: [data.email],
                    subject: "invitation to answer survey",
                    path: mailTemplatePath,
                    html: "<b>Err!</b>",
                    content: {
                        userName: username,
                        projectName: projectName,
                        description: question,
                        link: host.hostAddress + "/#/checkins/answer/" + checinId + '/' + token
                    }
                }
                mailer.sendEmail(mailPost, function(err, data) {
                    if(err) {
                        console.log(err);
                    } else {
                        //console.log(mailPost);
                    }
                })
            }
                    
        });
}

module.exports = sendEmailToCheckinPartisipants