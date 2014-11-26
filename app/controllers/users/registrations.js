var passport = require('passport');
var User = require('../../models/user');
var LocalStrategy = require('passport-local').Strategy;

exports.signup = function (req, res){
  res.render('users/registrations/signup', {
    'user' : ''
  });
};
exports.createAccount = function (req, res){
  console.log(req.body);
  /*User.register({ user : req.body } function(err, account) {
      if (err) {
          return res.render('register', { account : account });
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
  });*/
  res.redirect('/');
};