var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.home = function (req, res){
  res.render('homes/home', {
  });
};