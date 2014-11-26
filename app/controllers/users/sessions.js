exports.signin = function (req, res){
  res.render('users/sessions/signin', {
    title: 'Welcome'
  });
};