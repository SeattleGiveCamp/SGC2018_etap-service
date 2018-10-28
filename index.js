'use strict';
require('jsonwebtoken');
require('dotenv').config();
require('babel-register');
// Start up DB Server
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/default');

require('./models/user');
require('./config/passport');
// This will require our "app.js" file and immediately call its 'start' method, sending the port from our .env
require('./app.js').start(process.env.PORT || 8080);