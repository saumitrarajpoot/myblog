var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.home = function (req, res){
  User.findOne({_id: req.user._id}, function(err, user){
    if(err){
      return err;
    } else {
      return res.render('homes/home', {
        user: user
      });
    }
  });
};