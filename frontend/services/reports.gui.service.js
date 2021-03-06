class reportsGUI {
    constructor(httpGeneral) {
        this.http = httpGeneral;
        this.manageItem = manageItem;
        this.isUserPanel = false;
        this.isCheckinPanel = false;
        this.isTypePanel = true;
        this.manageTypePanel = manageTypePanel;
        this.manageCheckinPanel = manageCheckinPanel;
        this.manageUserPanel = manageUserPanel;
        this.arrayToString = arrayToString;
        this.manageArrayItems = manageArrayItems;
        this._types = ['Message', 'Task', 'Event', 'CheckIn'];
    }
}


function manageItem(index, fromArr, toArr, def, checkin, isAdding) {
    let item = fromArr[index];
    let indexTo = fromArr.indexOf(item);
    if (item == 'All') {
        if (def == 'user') {
            fromArr.splice(fromArr.indexOf("All"), 1);

            Array.prototype.splice.apply(toArr, [toArr.length, 0].concat(fromArr));
            fromArr.splice(0, fromArr.length);
            toArr.unshift("All");
            // toArr.splice(toArr.indexOf("All"), 1, 'All');
        }
        if (def == 'type') {
            fromArr.splice(0, fromArr.length);
            toArr.splice(0, toArr.length, 'All', 'Message', 'Task', 'Event', 'CheckIn');
            //goto spaghetti code
            if (isAdding) {
                checkin.isCheckinPick = true;
                if (!checkin.isLoaded) {
                    this.http.sendRequest({
                        type: "GET",
                        url: "api/checkins/project/" + window._injectedData.currentProject + "/questions"
                    }).then(function(res) {
                        checkin.questions = res;
                        checkin.isLoaded = true;
                    });
                    this.isCheckinPanel = true;
                }

            } else {
                checkin.isCheckinPick = false;
                this.isCheckinPanel = false;
            }
        }
    } else {
        fromArr.splice(indexTo, 1);
        toArr.push(item);
        if (fromArr.length == 1 && fromArr.indexOf("All") != -1) {
            fromArr.splice(0, 1);
        }
        if (toArr.length == 1) {
            toArr.unshift("All");
        }
        if (def == "type") {
            if (item == "CheckIn") {
                if (checkin) {
                    //goto spaghetti code
                    if (isAdding) {
                        checkin.isCheckinPick = true;
                        if (!checkin.isLoaded) {
                            this.http.sendRequest({
                                type: "GET",
                                url: "api/checkins/project/" + window._injectedData.currentProject + "/questions"
                            }).then(function(res) {
                                checkin.questions = res;
                                checkin.isLoaded = true;
                            });
                            this.isCheckinPanel = true;
                        }

                    } else {
                        checkin.isCheckinPick = false;
                        this.isCheckinPanel = false;
                    }
                }
            }
        }
    }
}

function manageCheckinPanel() {
    if (this.isCheckinPanel)
        this.isCheckinPanel = false;
    else {
        this.isCheckinPanel = true;
    }
}

function manageUserPanel() {
    if (this.isUserPanel)
        this.isUserPanel = false;
    else {
        this.isUserPanel = true;
    }
}

function manageArrayItems(item, toArr) {
    let index = toArr.indexOf(item);
    if (index == -1) {
        toArr.push(item);
    } else {
        toArr.splice(index, 1);
    }
}

function manageTypePanel() {
    if (this.isTypePanel)
        this.isTypePanel = false;
    else {
        this.isTypePanel = true;
    }
}

function arrayToString(arr) {
    let result = "";
    for (let i = 0; i < arr.length; i++) {
        result += ((arr[i].firstName ? arr[i].firstName : " ") + (arr[i].lastName ? arr[i].lastName : " "));
        if (i != arr.length - 1) result += ", ";
    }
    return result;
}

reportsGUI.$inject = ["httpGeneral"];

export {
    reportsGUI
};