var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  user_id: { type: String, default: '' },
  createdAt: {
    type: Date,
    'default': Date.now
  },
});


var isValidate = function(req){
  req.assert('title', 'Title is required').notEmpty();
  var errors = req.validationErrors();
  return errors;
};

BlogSchema.methods = {
  createBlog : function(req, fn){
    var errors = isValidate(req);
    var params = req.body
    this.title = params['title'].trim();
    this.content = params['content'].trim();
    this.user_id = req.user._id
    if(!errors){
      this.save(function (err) {
        fn(err, this);
      });
    } else{
      fn(errors, this);
    }
  }
};

BlogSchema.statics = {
  show: function(blogId){
    this.findOne({_id: blogId}).exec(cb);
  }

};
mongoose.model('Blog', BlogSchema);
