/**
 * Created by Radi on 7/22/2015.
 */
'use strict';
// Register imports
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config'); // Adds config.js resources

// Set connection to mongo database
var mongoose = require('mongoose');
mongoose.connect(config.database, function (error) {
    if (error) {
        console.log('Error connecting to Mongo database');
    } else {
        console.log('Successful Mongo database connection');
    }
});

// Set app
var app = express();

// Set url parsing
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Set API calls at localhost:3000/api
var api = require('./app/routes/api')(app, express);
app.use('/api', api);

// Set GET response
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

// Set server
app.listen(config.port, function (error) {
    if (!error) {
        console.log('Server running on port ' + config.port);
    } else {
        console.log('Error starting server');
    }
});