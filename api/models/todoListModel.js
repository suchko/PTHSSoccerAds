'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  subject: {
    type: String,
    Required: 'Kindly enter the subject'
  },
  contact: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  bio: {
    type: String
  },
  filename: {
     type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  design: {
    type: Boolean,
    default: false
  },
  adType: {
    type: String,
    enum: ['personal', 'business']
  },
  size: {
    type: String,
    enum: ['full', 'half', 'quarter', 'eighth']
  },
  originalname: {
    type: String
  },
  mimetype: {
    type: String
  }
});


module.exports = mongoose.model('ads', TaskSchema);