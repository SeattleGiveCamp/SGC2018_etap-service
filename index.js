'use strict';

require('dotenv').config();
require('babel-register');
// Start up DB Server
const mongoose = require('mongoose');
let MONGODB_URI = 'mongodb://heroku_c4pljh26:j7tgjs13lhjcpf7j3c80f0vlbs@ds143683.mlab.com:43683/heroku_c4pljh26';
mongoose.connect(MONGODB_URI);
// This will require our "app.js" file and immediately call its 'start' method, sending the port from our .env
require('./app.js').start(process.env.PORT);