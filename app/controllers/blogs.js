var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var User = mongoose.model('User');

exports.index = function (req, res){
  var user;
  Blog.find().exec().then(function(blogs){
    return res.render('blogs/index', {
      blogs: blogs
    });
  }).then(undefined, function(err) {
    req.flash('error', err.message)
    return res.redirect('back');
  });
};

exports.new = function (req, res){
  var blog = new Blog();
  res.render('blogs/new', {
    blog: blog,
    'csrfToken' : req.csrfToken()
  });

};

exports.create = function (req, res){
  var user = req.user;
  var blog = new Blog(req.body);
  blog.user = user.id;
  blog.save(function (err, blog) {
    if (!err) {
      User.findOneAndUpdate(
        {_id: req.user.id},
        {$push: {blogs: blog}},
        {safe: true, upsert: true},
        function(err, model) {
          console.log(err);
        }
      );
      req.flash('success', 'Successfully created blog!');
      return res.redirect('/homes');
    } else {
      var errors = [];
      var blog = new Blog(req.body);
      for(var error in err.errors){
        errors.push(err.errors[error].message);
      }
      res.render('blogs/new', {
        'errors' : errors,
        'blog' : blog,
        'csrfToken' : req.csrfToken()
      });
    }
  });
};

exports.show = function (req, res){
  Blog.findOne({_id: req.params.id}).exec().then(function(blog) {
    res.render('blogs/show', {
      blog: blog
    });
  }).then(undefined, function(err){
    req.flash('success', 'Requested blog does not exist.');
    return res.redirect('back');
  });
};

exports.edit = function (req, res){
  Blog.findOne({_id: req.params.id}).exec().then(function(blog) {
    res.render('blogs/edit', {
      blog: blog,
      csrfToken: req.csrfToken()
    });
  }).then(undefined, function(err){
    req.flash('success', 'Requested blog does not exist.');
    return res.redirect('back');
  });
};

exports.update = function (req, res){
  Blog.update({_id: req.params.id}, req.body).exec().then(function(blog) {
    res.redirect('/blogs/' + req.params.id);
  }).then(undefined, function(err){
    console.log(err);
    req.flash('success', 'Requested blog does not exist.');
    return res.redirect('back');
  });
};

exports.delete = function (req, res){
  Blog.remove({_id: req.params.id}).exec().then(function(blog) {
    req.flash('success', 'Blog  deleted successfully.');
  }).then(undefined, function(err){
    console.log(err);
    req.flash('success', 'Requested blog does not exist.');
    return res.redirect('back');
  });
};
