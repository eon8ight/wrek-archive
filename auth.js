function checkLoggedIn(req, res, next)
{
  if(req.user)
    next()
  else
    res.status(401).end({ error: 'You are not authorized to upload files.' })
}

module.exports = {
  checkLoggedIn
}