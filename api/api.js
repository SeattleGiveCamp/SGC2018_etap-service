'use strict';
import express from 'express';
const router = express.Router();
import litter from '../models/litter.js';

router.get('/api/v1/litter', (req,res) => {
  litter.find()
    .then( data => res.send(data))
    .catch( err => {
      res.status(404);
      res.send(err); 
    }); 
});
router.get('/api/v1/hello', (req,res) => {
  res.send('hello');
});

router.post('/api/v1/litter', (req,res) => {
  
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

export default router;