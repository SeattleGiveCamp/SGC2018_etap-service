'use strict';

require('dotenv').config();
require('babel-register');
// Start up DB Server
const mongoose = require('mongoose');
let MONGODB_URI = 'mongodb://sgc2018:sgc@2018@ds143683.mlab.com:43683/sgc2018';
mongoose.connect(MONGODB_URI);
// This will require our "app.js" file and immediately call its 'start' method, sending the port from our .env
require('./app.js').start(process.env.PORT);