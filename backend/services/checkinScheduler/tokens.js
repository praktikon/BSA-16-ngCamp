var checkinRepository = require('../../repositories/checkinRepository');
var mySet = new Set();

function getTokens(id) {
    if (mySet.size == 0) {
        checkinRepository.getAnswersByCheckinId(id, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                try {
                    if (data.answers){
                        data.answers.forEach(function (answer) {
                            mySet.add(answer.token);
                        });
                     }
                } catch (err) {
                    console.log(err);
                }
            }
        })
    }
}

function clearTokens() {
    mySet.clear();
}

module.exports = {
    mySet,
    getTokens,
    clearTokens
}

