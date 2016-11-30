import './checkinsStyles.styl';

class CheckinsListComponentController {
    constructor(httpGeneral, userService, checkinSvc) {
        let vm = this;
        vm.checkIns = [];
        vm.chSvc = checkinSvc;
        vm.externalUsersData = [];
        vm.httpGeneral = httpGeneral;
        vm.userService = userService;
        vm.weekdays = {
            get days() {
                return vm.chSvc.weekdays;
            }
        };
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
        self.chSvc.turnOnCheckin(checkin);
    }

    checkinFilter(mday) {
        let day = new RegExp(mday, 'g');
        return function(element) {
            return (element.frequency.match(day) ? true : false);
        };
    }
}

CheckinsListComponentController.$inject = ['httpGeneral', 'UserService', 'checkinSvc'];

const checkinsListComponent = {
    controller: CheckinsListComponentController,
    selector: 'checkinsListComponent',
    template: require('./checkinsList-pug.component.pug')(),
    controllerAs: 'check',
};

export {
    checkinsListComponent
};