
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
    'user' : user,
    'csrfToken' : req.csrfToken()
  });
};

exports.createAccount = function(req, res){
  var user = new User(req.body);
  user.save(function (err, user) {
    if (!err) {
      req.flash('success', 'Successfully created user!');
      return res.redirect('/');
    } else {
      var errors = [];
      var user = new User(req.body);
      user.password = '';
      user.password_confirmation = '';

      for(var error in err.errors){
        errors.push(err.errors[error].message);
      }

      res.render('users/registrations/signup', {
        'errors' : errors,
        'user' : user,
        'csrfToken' : req.csrfToken()
      });
    }
  });
};

