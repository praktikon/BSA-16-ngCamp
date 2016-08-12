import './menuStyles.styl';

class MenuComponentController {
    constructor(http) {
        this.http = http;
    }
}

MenuComponentController.$inject = ["httpGeneral"];

const menuComponent = {
    controller: MenuComponentController,
    controllerAs: 'MenuCtrl',
    selector: 'menuComponent',
    template: require('./menu-pug.component.pug')()
};

export {
    menuComponent
};