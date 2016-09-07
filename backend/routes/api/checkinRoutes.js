var apiResponse = require('express-api-response'),
    checkinRepository = require('../../repositories/checkinRepository'),
    checkinService = require('../../services/checkinService'),
    baseUrl = '/api/checkins/';

module.exports = function(app) {

    app.get(baseUrl, function (req, res, next) {       
        checkinRepository.getAll(function (err, data) {            
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id/withparticipants', function(req, res, next) {
        checkinRepository.getByIdWithParticipants(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', function(req, res, next) {
        checkinRepository.getById(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'answer/:id', function (req, res, next) {
        checkinRepository.getByAnswerToken(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'freq/:frequency', function (req, res, next) {
        checkinRepository.findCheckinsByFrequency(req.params.frequency, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        checkinService.addItem(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':id', function (req, res, next) {
        checkinService.updateItem(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + 'answer/:id', function (req, res, next) {
        checkinRepository.updateAnswerItem(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', function(req, res, next) {
        checkinRepository.deleteById(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

}