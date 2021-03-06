var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ReportsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Checkin'
    }],
    title: String,
    description: String,
    types: [String],
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dateRange: [Date],
    creationDate: Date,
    isSaved: Boolean
});

module.exports = mongoose.model('Reports', ReportsSchema);