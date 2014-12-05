var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title: { type: String, required: '{PATH} is required!' },
  content: { type: String, default: '' },
  user: {type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: {
    type: Date,
    'default': Date.now
  },
});

BlogSchema.pre('save', function(next){
  console.log('control in blog schema');
  next();
});

BlogSchema.methods = {
};

BlogSchema.statics = {
  show: function(blogId){
    this.findOne({_id: blogId}).exec(cb);
  }

};
mongoose.model('Blog', BlogSchema);
