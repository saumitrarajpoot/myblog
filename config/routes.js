var welcomes = require('../app/controllers/welcomes');
var registrations = require('../app/controllers/users/registrations');
var sessions = require('../app/controllers/users/sessions');
var homes = require('../app/controllers/homes');
var blogs = require('../app/controllers/blogs');
var auth = require('./middlewares/authorization');

module.exports = function (app, passport) {
  app.get('/',  blogs.index);
  //app.get('/blogs', auth.requiresLogin,);

  app.get('/users/signin', sessions.signin);
  app.post('/users/signin', passport.authenticate('local', {
      successRedirect: '/homes',
      failureRedirect: '/users/signin'
    }));
  app.get('/users/signout', sessions.destroy);
  app.get('/users/signup', registrations.signup);
  app.post('/users/signup', registrations.createAccount);
  app.get('/homes', auth.requiresLogin, homes.home);

  /* blogs routing list */
  app.get('/blogs', blogs.index)
  app.get('/blogs/new', auth.requiresLogin, blogs.new)
  app.post('/blogs/create', auth.requiresLogin, blogs.create)
  app.get('/blogs/:id', blogs.show)
  app.get('/blogs/:id/edit', auth.requiresLogin, blogs.edit)
  app.post('/blogs/:id/update', auth.requiresLogin, blogs.update)
  app.post('/blogs/:id/delete', auth.requiresLogin, blogs.delete)
};
