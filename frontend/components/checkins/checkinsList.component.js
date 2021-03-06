import './checkinsStyles.styl';

class CheckinsListComponentController {
    constructor(httpGeneral, userService) {
        this.httpGeneral = httpGeneral;
        this.checkIns = [];
        this.userService = userService;
        this.externalUsersData = [];
    }

    $onInit() {
        let self = this;
        const async = require('async');
        async.waterfall([
            function(callback) {
                self.userService.getExternalUsersData().then(function(data) {
                    self.externalUsersData = data;
                    callback(null, data);
                });
            },
            function(extUsers, callback) {
                self.httpGeneral.sendRequest({
                    type: "GET",
                    // url: `api/checkins`
                    url: `api/checkins/projectId/${window._injectedData.currentProject}`
                    
                }).then(function(res) {
                    for (let check in res) {
                        self.checkIns.push(res[check]);
                    }
                    for (let i = 0; i < res.length; i++) {
                        if (!self.externalUsersData) self.userService.setUsersShortNames(res[i].participants);
                        else self.userService.setAvatars(res[i].participants, self.externalUsersData);
                    }
                    callback(null, null);
                });
            }
        ]);
    }

    turnOn(checkin) {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "PUT",
            url: `api/checkins/${checkin._id}`,
            body: {
                isTurnedOn: checkin.isTurnedOn
            }
        }).then(function(res) {
            console.log("Succesfull change status of checkin");
        });
    }

    checkinFilter(mday) {
        let day = new RegExp(mday, 'g');
        return function(element) {
            return (element.frequency.match(day) ? true : false);
        };
    }
}

CheckinsListComponentController.$inject = ['httpGeneral', 'UserService'];

const checkinsListComponent = {
    controller: CheckinsListComponentController,
    selector: 'checkinsListComponent',
    template: require('./checkinsList-pug.component.pug')(),
    controllerAs: 'check',
};

export {
    checkinsListComponent
};