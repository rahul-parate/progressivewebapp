#! /usr/bin/env node

var express = require('express'),
app = express(),
port = process.env.PORT || 8080,
mongoose = require('mongoose'),
Task = require('./models/savedataModel'),
bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/PWA_db',{useMongoClient: true}); 
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./routes/apiroutes');
routes(app);


app.listen(port);


console.log('RESTful API server started on: ' + port);
