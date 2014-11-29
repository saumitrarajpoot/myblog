var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

exports.new = function (req, res){
  var blog = new Blog();
  res.render('blogs/new', {
    blog: blog,
    'csrfToken' : req.csrfToken()
  });

};

exports.create = function (req, res){
  var blog = new Blog();
  blog.createBlog(req, function (err, blog) {
    if (!err) {
      req.flash('success', 'Successfully created blog!');
      return res.redirect('/homes');
    } else {
      res.render('blogs/new', {
        'errors' : err,
        'blog' : blog,
        'csrfToken' : req.csrfToken()
      });
    }
  });
};
