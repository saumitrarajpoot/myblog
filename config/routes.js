var welcomes = require('../app/controllers/welcomes');
var registrations = require('../app/controllers/users/registrations');
var sessions = require('../app/controllers/users/sessions');
var homes = require('../app/controllers/homes');

module.exports = function (app, passport) {
  app.get('/', welcomes.index);

  app.get('/users/signin', sessions.signin);
  app.post('/users/signin', passport.authenticate('local', {
      successRedirect: '/homes',
      failureRedirect: '/users/signin'
    }), sessions.createSession);
  app.get('/users/signup', registrations.signup);
  app.post('/users/signup', registrations.createAccount);
  app.get('/homes', homes.home);
};