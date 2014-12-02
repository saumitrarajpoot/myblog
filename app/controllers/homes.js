var mongoose = require('mongoose');
var User = mongoose.model('User');
var Blog = mongoose.model('Blog');

exports.home = function (req, res){
  var user;
  Blog.find({user_id: req.user.id}).exec().then(function(blogs){
    return res.render('homes/home', {
      blogs: blogs
    });
  }).then(undefined, function(err) {
    req.flash('error', err.message)
    return res.render('homes/home', {
      user: undefined
    });
  });
};
