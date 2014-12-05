var mongoose = require('mongoose');
var crypto = require('crypto');
var uuid = require('node-uuid');
var expressValidator = require('express-validator');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, default: '' },
  email: {
    type: String,
    index: { unique: true },
    required: '{PATH} is required!',
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'A valid email is required'],
  },
  username: {
    type: String,
    index: { unique: true },
    required: '{PATH} is required!'
  },
  password: {type: String },
  salt: { type: String, required: true, default: uuid.v1 },
  createdAt: {
    type: Date,
    'default': Date.now
  },
  provider: {type: String, default: 'local'},
  blogs: [mongoose.Schema.ObjectId]
});

UserSchema.virtual('password_confirmation')
  .get(function() {
    return this._password_confirmation;
  })
  .set(function(value) {
  this._password_confirmation = value;
});

UserSchema.path('password').validate(function() {
  if (this.password || this._password_confirmation) {
    if (this.password.length < 8) {
      this.invalidate('password', 'must be at least 8 characters.');
    }
    if (this.password !== this._password_confirmation) {
      this.invalidate('password_confirmation', 'password does not match password confirmation.');
    }
  }

  if (this.isNew && !this.password) {
    this.invalidate('password', 'password is required');
  }
}, null);

UserSchema.path('email').validate(function(value, respond) {
  mongoose.models["User"].findOne({email: value}, function(err, user) {
    if(err) throw err;
    if(user) return respond(false);
    respond(true);
  });
}, 'email already exists');

UserSchema.path('username').validate(function(value, respond) {
  mongoose.models["User"].findOne({username: value}, function(err, user) {
    if(err) throw err;
    if(user) return respond(false);
    respond(true);
  });
}, 'username already exists');


UserSchema.pre('save', function(next){
  this.password = password_ecryption(this.password, this.salt);
  next();
});

var password_ecryption = function(password, salt) {
  var encrypted_password = crypto.createHmac('sha256', salt).update(password).digest('hex');
  return encrypted_password;
};

UserSchema.methods = {
  authenticate: function (plainText) {
    return password_ecryption(plainText, this.salt) === this.password;
  },
};

UserSchema.statics = {
  load: function (options, cb) {
    options.select = options.select || 'name username';
    this.findOne(options.criteria)
      .exec(cb);
  },
  getUser: function(userId){
    this.findOne({_id: userId}).exec(cb);
  }
};

mongoose.model('User', UserSchema);
