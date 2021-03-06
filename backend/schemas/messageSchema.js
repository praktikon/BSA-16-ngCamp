var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./userSchema');
var Project = require('./projectSchema');
var File = require('./fileSchema');

var messageSchema = new Schema({
    isDraft: Boolean,
    title: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    date: Date,
    comments: [
        {
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            date: Date,
            description: String,
            files: [String]
        }
    ],
    files: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }]
});

module.exports = mongoose.model('Message', messageSchema);