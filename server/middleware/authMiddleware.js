// authMiddleware.js
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const verifyToken = (req, res, next) => {
  const token = getTokenFrom(req)

  if (!token) {
    return res.status(401).json({ error: 'Token is required' })
  }

  try {
    const decodedToken = jwt.verify(token, 'jwt_secret')
    req.user = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = verifyToken
