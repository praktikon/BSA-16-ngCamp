import './messageBoard.styl';

class messageBoardController {
    constructor(httpGeneral, $location, $window,$rootRouter) {
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.window = $window;
        this.messages = [];
        this.isBigText = false;
        this.rootRouter = $rootRouter;
        this.isAdmin = false;
    }
    $onInit() {
        let self = this;
        let i = 0;
        self.httpGeneral.sendRequest({
            type: "GET",
            url: "api/messages"
        }).then(function(res) {
            for (let msg in res) {
                if (res[msg].project === window._injectedData.currentProject) {
                    self.messages.push(res[msg]);
                    self.messages[i].showFull = false;
                    let len = self.messages[i].description.length;
                    if (self.messages[i].description.length > 400) {
                        self.messages[i].isBigText = true;
                        self.messages[i].firstPart = self.messages[i].description.substring(0, 400);
                        self.messages[i].secondPart = self.messages[i].description.substring(401, self.messages[i].description.length);
                    } else {
                        self.messages[i].isBigText = false;
                    }
                    i++;
                }
            };
        });
        if (window._injectedData.currentProject === undefined) {
            self.rootRouter.navigateByUrl('/noProject');
        }
        let projReq = {
            type: "GET",
            url: `api/projects/${window._injectedData.currentProject}/withUsers`,
            errorCallback(){
                self.popup.notifyError('Project download Error!');
            }   
        };
        self.httpGeneral.sendRequest(projReq).then(function(res){
            for (let i = 0; i < res.admins.length; i ++){
                if (res.admins[i]._id === window._injectedData.userId){
                    self.isAdmin = true;
                }
            }
        });

    }
    showText(index) {
        let self = this;
        self.messages[index].showFull = true;
    }
    hideText(index) {
        let self = this;
        self.messages[index].showFull = false;
    }
    isAuthor(message){
        let self = this;
        let ans = false;
        if (message.author._id === window._injectedData.userId) ans = true; 
        return ans;
    }
}

messageBoardController.$inject = ['httpGeneral', '$location', '$window','$rootRouter'];

const messageBoardComponent = {
    controller: messageBoardController,
    controllerAs: 'msgBoard',
    template: require('./messageBoard.pug')(),
    selector: 'messageBoard'
};

export {
    messageBoardComponent
};