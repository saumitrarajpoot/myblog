function setFlash(req,res,next) {
  res.locals.flash = {
    notice: (req.flash('notice') === undefined ) ? res.flash('notice') : req.flash('notice'),
    error: (req.flash('error')  === undefined ) ? res.flash('error') : req.flash('error')
  }
  next()
}

module.exports = setFlash
