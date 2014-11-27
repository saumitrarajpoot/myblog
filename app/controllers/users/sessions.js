exports.signin = function (req, res){
  res.render('users/sessions/signin', {
    title: 'Welcome'
  });
};

exports.createSession = function (req, res){
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
};
