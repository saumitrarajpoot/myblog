var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, index: { unique: true }, default: '' },
  username: { type: String, index: { unique: true }, default: '' },
  password: { type: String, default: '' }
});

var User = mongoose.model('User', userSchema);