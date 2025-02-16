const crypto = require('crypto')

function hashSenha(senha) {
  return crypto.createHash('sha256').update(senha).digest('hex')
}

module.exports = { hashSenha }