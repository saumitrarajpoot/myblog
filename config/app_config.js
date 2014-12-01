var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs = require('fs');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session')
var connectFlash = require('connect-flash');
var csurf = require('csurf')
var Promise = require("bluebird")

var env         = process.env.NODE_ENV || 'development';
var packageJson = require('../package.json');
var path        = require('path');

global.App = {
  app: express(),
  port: process.env.PORT || 3000,
  version: packageJson.version,
  name: packageJson.name,
  root: path.join(__dirname, '..'),
  appPath: function(path) {
    return this.root + '/' + path
  },
  env: env,
  start: function() {
    if (!this.started) {
      this.started = true
      this.app.listen(this.port)
      console.log("Running App Version " + App.version + " on port " + App.port + " in " + App.env + " mode")
    }
  },
  middleware: function(path) {
    return require(this.root + "/config/middlewares" + "/" + path)
  },
  model: function(path) {
    return this.require("app/models/" + path)
  }
}

// view engine setup
App.app.set('views', App.appPath('/app/views'));
App.app.set('view engine', 'jade');

/*database connectivity*/
var databaseConfig = require(App.appPath('/config/database'));
mongoose.connect(databaseConfig.url);
var db = mongoose.connection;
db.once('open', function() {
  console.log('connected to database');
});

var models_path = App.appPath('/app/models');
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
App.app.use(logger('dev'));
App.app.use(bodyParser.json());
App.app.use(bodyParser.urlencoded({ extended: false }));
App.app.use(cookieParser());
App.app.use(express.static(path.join(App.root, 'public')));
App.app.use(expressValidator([]));
App.app.use(expressSession({secret: 'secretKey', saveUninitialized: true, resave: true}));
//App.app.use(expressSession({secret: 'secretKey'}));
App.app.use(passport.initialize());
App.app.use(passport.session());
var auth = App.middleware('attachAuthenticationStatus');
App.app.use(auth);
App.app.use(connectFlash());
App.app.use(csurf());

require(App.appPath('/config/passport'))(passport);
require(App.appPath('/config/routes'))(App.app, passport);

var setFlash = App.middleware('setFlash');
var invalidCsrfToken  =  App.middleware('invalidCsrfToken');
App.app.use(setFlash);
App.app.use(invalidCsrfToken);

// catch 404 and forward to error handler
App.app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (App.app.get('env') === 'development') {
    App.app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
App.app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
