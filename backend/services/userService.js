var userRepository = require('../repositories/userRepository');
var validationService = require('./validationService');

function UserService() {

}

UserService.prototype.addItem = addItem;
UserService.prototype.updateItem = updateItem;

function addItem(body, callback) {
    if (validationService.addUserValidation(body, callback)) {
        userRepository.add(body, callback);
    }    
}

function updateItem(body, callback) {
    if (validationService.validationBodyProperty(body, callback) &&
            validationService.validationBodyProperty(body, callback)) {
        userRepository.setObjPropsById(body._id, body.dataToUpdate, callback);
    }
}

module.exports = new UserService();
