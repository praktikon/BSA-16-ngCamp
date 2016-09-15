﻿//import './checkinsStyles.styl';

class RightPanelComponentController {
    constructor(httpGeneral, $scope, $rootScope) {
        let vm = this;
        vm.httpGeneral = httpGeneral;
        vm.date = new Date();
        vm.scp = $scope;
        vm.rootScp = $rootScope;
        vm.checkins = [];
        vm.dailyCheckinsList = [];
        vm.endOfMonth = 35;
        this.days = ['Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'];
    }

    $onInit() {
        let vm = this;
        let dateObj = {
            year: vm.date.getFullYear(),
            month: vm.date.getMonth(),
            date: vm.date.getUTCDate()
        };
        vm.getCheckins(dateObj);
        vm.dailyCheckinsList[dateObj.date] = {checkins: vm.checkins, day: dateObj};
        vm.scp.$on('date', function(event, day){
            vm.date = day;
            vm.checkins = [];
            vm.getCheckins(day);
            vm.dailyCheckinsList = [];
            vm.dailyCheckinsList[vm.date.date] = {checkins: vm.checkins, day: vm.date};
            vm.dailyCheckinsList[0] = 1;
     
        });

        vm.scp.$on('endmonthdate', function(event, day){
            vm.endOfMonth = day;
        });

        vm.scp.$on('shiftdate', function(event, day){
            let leftMost = vm.findLeftMostDate();
            if(day.date < leftMost.date){
                while (leftMost.date != day.date){
                     let date = {
                        year: leftMost.year,
                        month: leftMost.month,
                        date: leftMost.date - 1
                    };
                    vm.checkins = [];
                    vm.getCheckins(date);
                     vm.dailyCheckinsList[day.date] = {checkins: vm.checkins, day: date};
                    if(vm.dailyCheckinsList[0]){
                        vm.dailyCheckinsList[0] += 1;
                    } else {
                        vm.dailyCheckinsList[0] = 1;
                    }
                    vm.rootScp.$broadcast('addDate', date);
                    leftMost = date;
                }
            } else if (day.date <= vm.endOfMonth){
                  while (leftMost.date != day.date){
                     let date = {
                        year: leftMost.year,
                        month: leftMost.month,
                        date: leftMost.date + 1
                    };
                    vm.checkins = [];
                    vm.getCheckins(date);
                     vm.dailyCheckinsList[day.date] = {checkins: vm.checkins, day: date};
                    if(vm.dailyCheckinsList[0]){
                        vm.dailyCheckinsList[0] += 1;
                    } else {
                        vm.dailyCheckinsList[0] = 1;
                    }
                    vm.rootScp.$broadcast('addDate', date);
                    leftMost = date;
                }
            }
        });

        vm.scp.$on('ctrldate', function(event, day){
            if (day.date>=1 && day.date <= vm.endOfMonth){
                vm.checkins = [];
                vm.getCheckins(day);
                vm.dailyCheckinsList[day.date] = {checkins: vm.checkins, day: day};
                if(vm.dailyCheckinsList[0]){
                    vm.dailyCheckinsList[0] += 1;
                } else {
                    vm.dailyCheckinsList[0] = 1;
                }
                vm.rootScp.$broadcast('addDate', day);
            }
        });

        angular.element(document.querySelectorAll('right-panel-component.ng-isolate-scope')).bind("scroll", function(){
            let scrollHeight = document.getElementsByTagName('right-panel-component')[0].scrollHeight;
            let scrollTop = document.getElementsByTagName('right-panel-component')[0].scrollTop;
            let offsetHeight = document.getElementsByTagName('right-panel-component')[0].offsetHeight;
            if ((scrollHeight - scrollTop - offsetHeight) < 50 && scrollHeight > 0 ) {
                let left = vm.findLeftMostDate();
                let right = vm.findRightMostDate();
                if((right.date-left.date + 1 == vm.dailyCheckinsList[0]) || vm.dailyCheckinsList.length == 1 ){
                    vm.previousDay();
                }
            }
        });

        angular.element(document).bind("mousewheel", function(){
            let scrollHeight = document.getElementsByTagName('right-panel-component')[0].scrollHeight;
            let clientHeight = document.getElementsByTagName('right-panel-component')[0].clientHeight;
            if(scrollHeight == clientHeight){
                let left = vm.findLeftMostDate();
                let right = vm.findRightMostDate();
                console.log(vm.dailyCheckinsList[0]);
                console.log(left.date);
                console.log(right.date);
                if((right.date-left.date + 1 == vm.dailyCheckinsList[0]) || vm.dailyCheckinsList.length == 1 ){
                    vm.previousDay();
                }
            }
        });
    }

    getCheckins(day){
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: 'api/checkins/bydate/' + day.year + '/' + day.month + '/' +day.date
        }).then(function(res) {
            res.forEach(function(check){
                vm.checkins.push(check);
            });
        });
    }

    previousDay(){
        let vm = this;
        let leftMost = vm.findLeftMostDate();
        if(leftMost.date>1){
            vm.checkins = [];
            let date = {
                year: leftMost.year,
                month: leftMost.month,
                date: leftMost.date - 1
            };
            vm.getCheckins(date);
            vm.dailyCheckinsList[date.date] = {checkins: vm.checkins, day: date};
            if(vm.dailyCheckinsList[0]){
                vm.dailyCheckinsList[0] += 1;
            } else {
                vm.dailyCheckinsList[0] = 1;
            }
            vm.rootScp.$broadcast('addDate', date);
        }
    }

    findLeftMostDate(){
       let vm = this;
       let leftMost = null;
       for (let i=1; i<vm.dailyCheckinsList.length; i++){
           if (vm.dailyCheckinsList[i]){
               leftMost = vm.dailyCheckinsList[i].day;
               break;
           }
       }
       return leftMost;
    }
    
    findRightMostDate(){
       let vm = this;
       let leftMost = null;
       for (let i=vm.dailyCheckinsList.length; i>=0; i--){
           if (vm.dailyCheckinsList[i]){
               leftMost = vm.dailyCheckinsList[i].day;
               break;
           }
       }
       return leftMost;
    }
}

RightPanelComponentController.$inject = ['httpGeneral', '$scope', '$rootScope'];

const rightPanelComponent = {
    controller: RightPanelComponentController,
    selector: 'rightPanelComponent',
    controllerAs: 'rpanel',
    template: require('./panel-pug.component.pug')(),
    $routeConfig: [{
        path:'/',
        name:'Checkins List',
        component:'checkinsListComponent',
        useAsDefault: true
    }]
};

export {
    rightPanelComponent
};