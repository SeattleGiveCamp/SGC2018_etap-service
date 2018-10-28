'use strict';

// Third Party Modules
import express from 'express';
//import morgan from 'morgan';
import cors from 'cors';

// Our modules
import router from './api/api';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(morgan());
app.use(cors());
// Our API
app.use(router);
let server = false;

module.exports = {
  start: (port) => {
    if(!server) {
      server = app.listen(port, (err) => {
        if(err) { throw err; }
        console.log('Server running on ' + port);
      });
    } else {
      console.log('Server is already running');
    }
  },
  stop: () => {
    server.close(() => {
      console.log('Server has closed');
    });
  },
  server: app,
};