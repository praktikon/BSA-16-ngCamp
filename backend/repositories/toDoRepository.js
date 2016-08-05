var Repository = require('./generalRepository');
var ToDo = require('../schemas/toDoSchema');

function ToDoRepository() {
    Repository.prototype.constructor.call(this);
    this.model = ToDo;
}


ToDoRepository.prototype = new Repository();

ToDoRepository.prototype.getAllToDosInTask = getAllToDosInTask;
ToDoRepository.prototype.deleteAllToDosInTask = deleteAllToDosInTask;
//==============================================================
function getAllToDosInTask(id, callback) {
    var model = this.model;
    var query = model.findOne({
        task: id
    });
    query.exec(callback);
}
//==============================================================
function deleteAllToDosInTask(id, callback) {
    var model = this.model;
    var query = model.remove({
        task: id
    });
    query.exec(callback);
}
//==============================================================
model.exports = new ToDoRepository();