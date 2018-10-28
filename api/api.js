'use strict';
import express from 'express';
import auth from '../routes/auth';
import passport from 'passport';
import mongoose from 'mongoose';

const Users = mongoose.model('Users');

var path = require('path');
const router = express.Router();
import litter from '../models/litter.js';

createAdminUser();

router.get('/api/v1/litter', (req,res) => {
  litter.find()
    .then( data => res.send(data))
    .catch( err => {
      res.send(`${err}: Try posting some data  `); 
    }); 
});
router.get('/api/v1/hello', (req,res) => {
  res.send('hello');
});
router.get('/', (req,res) => {
  res.sendFile(path.join(__dirname +'/index.html'));
});

router.post('/api/v1/litter', auth.required, (req,res) => {
  
  if(Object.keys(req.body).length === 0){
    res.status(400);
    res.send('Bad Request: Request body not received');
  }
  else{
    let record = new litter(req.body);
    record.save()
      .then(data => res.send(data))
      .catch(err=>console.log(err));
  }
});
router.put('/api/v1/litter/:id', (req,res) => {
  if(Object.keys(req.body).length === 0){
    res.status(400);
    res.send('Bad Request: Request body not received');
  }
  else{
    litter.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new: true})
      .then(data => res.send(data))
      .catch(err => {
        res.status(404);
        res.send(err);});
  }
});
// log in
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.userName) {
    return res.status(422).json({
      errors: {
        userName: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

/* USER CREATE ENDPOINT- NOT FOR PROD!
router.post('/user', auth.required, (req, res, next) => {
  const { body: { user } } = req;
  if(!user) {
    return res.status(422).json({
      errors: {
        user: 'is required',
      },
    });
  }
  if(!user.userName) {
    return res.status(422).json({
      errors: {
        userName: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});
*/

function createAdminUser() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if(username)
    Users.find({ userName: username }, function(err, docs) {
      if(docs.length) {
        return;
      } else {
        if(password) {
          const adminUser = new Users({
            userName: username,
            password: password,
          });
          adminUser.setPassword(password);
          adminUser.save();          
        }
      }
    });
}

export default router;