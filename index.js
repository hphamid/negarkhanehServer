/**
 * Created by hamid on 7/21/16.
 */
require("./models"); //just to init db;

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const configurePassport = require('./configurePassport');
const routes = require('./routes');
const middleware = require('./middleware');

var app = express() ;
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session(
    {
        secret: 'justASecretToKeepSafe124!',
        resave: false,
        saveUninitialized: false
    }
)); // session secret

configurePassport(app);
middleware(app);
routes(app);

app.listen(8080);
console.log("app started at port: 8080");




