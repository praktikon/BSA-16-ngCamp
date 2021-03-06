var Repository = require('./generalRepository');
var Project = require('../schemas/projectSchema');

ProjectRepository.prototype = new Repository();
ProjectRepository.prototype.addParticipants = addParticipants;
ProjectRepository.prototype.removeParticipants = removeParticipants;
ProjectRepository.prototype.addAdmin = addAdmin;
ProjectRepository.prototype.removeAdmin = removeAdmin;
ProjectRepository.prototype.getProjectsByParticipantId = getProjectsByParticipantId;
ProjectRepository.prototype.getByIdWithUsers = getByIdWithUsers;
ProjectRepository.prototype.changeState = changeState;
ProjectRepository.prototype.getUsers = getUsers;
ProjectRepository.prototype.getParticipantsByProjectId = getParticipantsByProjectId;
ProjectRepository.prototype.isAdmin = isAdmin;

function ProjectRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Project;
};

function getUsers(id, callback) {
    var query = this.model.findOne({
        _id: id
    }, {
        participants: 1
    }).populate({
        path: "participants",
        select: "firstName secondName"
    });
    query.exec(callback);
}

function getProjectsByParticipantId(userId, callback) {
    var model = this.model;
    var query = model.find({
        participants: userId
    }).find({
        status: {
            $in: ['active', 'finished']
        }
    });
    query.exec(callback);
}

function getByIdWithUsers(id, callback) {
    var query = this.model.findOne({
        _id: id
    }).populate('participants admins');
    query.exec(callback);
}

function addParticipants(id, data, callback) {
    var model = this.model;
    var query = model.update({
        _id: id
    }, {
        $addToSet: {
            participants: {
                $each: data
            }
        }
    });
    query.exec(callback);
}

function removeParticipants(id, data, callback) {
    var model = this.model;
    var query = model.update({
        _id: id
    }, {
        $pull: {
            participants: data,
        }
    }, {
        multi: true
    });
    query.exec(callback);
}

function addAdmin(id, data, callback) {
    var model = this.model;
    var query = model.update({
        _id: id
    }, {
        $addToSet: {
            admins: {
                $each: data
            }
        }
    });
    query.exec(callback);
}


function removeAdmin(id, data, callback) {
    var model = this.model;
    var query = model.update({
        _id: id
    }, {
        $pull: {
            admins: data,
        }
    }, {
        multi: true
    });
    query.exec(callback);
}


function changeState(id, state, callback) {
    var query = this.model;

    var conditions = {
        _id: id
    };

    var update = {
        $set: {
            "status": state
        }
    };
    query.update(conditions, update).exec(callback);
}

function getParticipantsByProjectId(id, callback) {
    var model = this.model;
    var query = model.findOne({
        _id: id
    }).select({
        participants: 1,
        _id: 0
    }).populate('participants');
    query.exec(callback);
}

function isAdmin(idProject, idUser, callback) {
    var model = this.model;
    /*model.count({
        _id: idProject,
        admins: idUser
    }, function(err, count) {
        callback(count, count);
    });*/
    var query = model.find({
        _id: idProject,
        admins: idUser
    }).select({
        _id: 1
    });
    query.exec(callback);

}


module.exports = new ProjectRepository();