function invalidCsrfToken(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  res.status(403)
  res.send('session has expired or form tampered with')
}

module.exports = invalidCsrfToken
