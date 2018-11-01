'use strict';
import mongoose from 'mongoose';
const litterSchema = mongoose.Schema({
  siteName: {type: String, required: true},
  summary: {type:Object},
  siteInfo: {type: Object},
  siteConditions: {type: Object},
  weightAssessment: {type:Object},
  landUse: {type: Object},
  categories: {type:Object},
  habitatInformation: {type: Object},
  generalObservation: {type: String},
  preventativeMeasures: {type: Object},
});
const Litter = mongoose.model('litter', litterSchema);
export default Litter;