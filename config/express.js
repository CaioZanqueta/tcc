var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');
var session = require('express-session');
var path = require('path');

module.exports = function() {
	var app = express();
	app.use(express.static('public'));
	app.set('view engine','ejs');
	app.use(session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	}));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	load('routes')
	.then('infra')
	.into(app);
	return app;
}