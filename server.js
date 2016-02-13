'use strict';

//Dependencies
let express = require('express');
let passport = require('passport');
let config = require('./config');
let bodyParser = require("body-parser");
let db = require ('./lib/mongoose');

//Create a new Express application
let app = express();

//Connect to db
db.on('error', console.error.bind(console, 'connection error:'));

//Main
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(require('express-session')({secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//Auth
require('./lib/passport')(passport);

//Routes
require('./lib/routes')(app, passport);

app.listen(config.port);