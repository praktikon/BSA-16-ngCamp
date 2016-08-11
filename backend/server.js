var bodyParser = require('body-parser'),
	context = require('./units/context'),
	express = require('express'),
	mongooseConnection = require('./db/dbConnect').connection,
	path = require('path'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	sessionSecret = require('./config/session').secret,
	mongoose = require('mongoose'),
	fileUpload = require('express-fileupload');

var app = express();

app.use(session({
	secret: sessionSecret,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
		mongooseConnection: mongooseConnection
	})
}));

context.mongoStore = new MongoStore({
	mongooseConnection: mongooseConnection
});

var staticPath = path.resolve(__dirname + '/../public');
app.use(express.static(staticPath));
var staticPath = path.resolve('build');
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(fileUpload());

var apiRoutes = require('./routes/api/routes')(app),
	viewRoutes = require('./routes/view/routes')(app);

var docs = require("express-mongoose-docs");

docs(app, mongoose);
// if (app.get('env') === 'development') {
// 	var webpackMiddleware = require("webpack-dev-middleware");
// 	var webpack = require('webpack');

// 	var config = require('../webpack.config');

// 	app.use(webpackMiddleware(webpack(config), {
// 		publicPath: '/public/js/'
// 	}));

// }

var server = app.listen(3060);

module.exports = app;