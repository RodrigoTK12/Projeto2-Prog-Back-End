const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  const token = req.session.token || req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(401).send('Acesso negado. Token não fornecido.')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).send('Token inválido ou expirado.')
  }
}

exports.verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).send('Acesso negado. Apenas administradores podem acessar esta rota.')
  }
  next()
}