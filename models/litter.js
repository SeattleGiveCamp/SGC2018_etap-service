'use strict';
import mongoose from 'mongoose';
const litterSchema = mongoose.Schema({
  siteName: {type: String, required: true},
  summary: {type:Object},
  siteInfo: {type: Object},
  siteCondition: {type: Object},
  weightAssessment: {type:Object},
  landUse: {type: Object},
  categories: {type:Object},
  habitatInformation: {type: String},
  generalObservation: {type: String},
  
});
const Litter = mongoose.model('litter', litterSchema);
export default Litter;