var mongoose = require('mongoose');
var uuid = require('node-uuid');
var crypto = require("crypto");

var userSchema = new mongoose.Schema({
  name: String,
  wechat_id: String
});

mongoose.model('User', userSchema);
module.exports = mongoose.model('User');
