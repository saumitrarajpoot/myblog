exports.index = function (req, res){
  res.render('welcomes/index', {
    title: 'Welcome'
  });
};