'use strict';
import mongoose from 'mongoose';
require('dotenv').config();
let MONGODB_URI = 'mongodb://heroku_c4pljh26:j7tgjs13lhjcpf7j3c80f0vlbs@ds143683.mlab.com:43683/heroku_c4pljh26';
mongoose.connect(MONGODB_URI);
const litterSchema = mongoose.Schema({
  siteName: {type: String, required: true},
  summary: {type:Object},
  siteInfo: {type: Object},
  siteCondition: {type: Object},
  weightAssessment: {type:Object},
  landUse: {type: String},
  categories: {type:Object},
  habitatInformation: {type: String},
  generalObservation: {type: String},
  
});
const Litter = mongoose.model('litter', litterSchema);
export default Litter;