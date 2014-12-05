var mongoose = require('mongoose');
var User = mongoose.model('User');
var Blog = mongoose.model('Blog');

exports.home = function (req, res){
  var user;
  /*User.find({_id: req.user.id}).populate('blogs').exec().then(function(users){
    console.log(users);
  }).then(undefined, function(err) {
    req.flash('error', err.message)
    return res.render('homes/home', {
      user: undefined
    });
  });*/
  Blog.find({user: req.user.id}).exec().then(function(blogs){
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
