exports.signin = function (req, res){
  res.render('users/sessions/signin', {
    'csrfToken' : req.csrfToken()
  });
};

exports.createSession = function (req, res){
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  req.flash('notice', 'You have successfully signed in.');
  res.redirect(redirectTo);
};

exports.destroy = function(req, res){
  req.logout()
  req.flash('notice', 'You have successfully signed out.')
  res.redirect('/')
}
