
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
/**
 * List
 */

exports.signup = function (req, res){
  var user = new User();
  res.render('users/registrations/signup', {
    'user' : user
  });
};

exports.createAccount = function(req, res){
  var user = new User();
  user.createUser(req, function (err, user) {
    if (!err) {
      req.flash('success', 'Successfully created user!');
      return res.redirect('/');
    } else {
      res.render('users/registrations/signup', {
        'errors' : err,
        'user' : user
      });
    }
  });
};

