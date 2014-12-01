var mongoose = require('mongoose');
var User = mongoose.model('User');
var Blog = mongoose.model('Blog');

exports.home = function (req, res){
  var user;
  User.findOne({_id: req.user._id}).exec().then(function(user){
    return res.render('homes/home', {
      user: user
    });
  }).then(undefined, function(err) {
    req.flash('error', err.message)
    return res.render('homes/home', {
      user: undefined
    });
  });
};
