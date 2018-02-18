'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var savedataSchema = new Schema({
  Original_test:String,
  encrypted_text:String,
  en_Array: String

});

module.exports = mongoose.model('saveinmongo', savedataSchema);

