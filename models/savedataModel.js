'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var savedataSchema = new Schema({
  Original_test:String,
  encrypted_text:String

});

module.exports = mongoose.model('saveinmongo', savedataSchema);

