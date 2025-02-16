const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { hashSenha } = require('../utils/hash')

const registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, isAdmin } = req.body

    if (!nome || !email || !senha) {
      return res.status(400).send('Todos os campos são obrigatórios.')
    }

    const usuarioExiste = await User.findOne({ email })
    if (usuarioExiste) {
      return res.status(400).send('Usuário já cadastrado.')
    }

    const hashedPassword = hashSenha(senha)

    const user = new User({ 
      nome, 
      email, 
      senha: hashedPassword, 
      isAdmin: isAdmin === 'true' || isAdmin === true 
    })

    await user.save()
    res.redirect('/login')
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)
    res.status(500).send('Erro no servidor ao registrar usuário.')
  }
}

const login = async (req, res) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).send('Email e senha são obrigatórios.')
    }

    const user = await User.findOne({ email })
    if (!user || user.senha !== hashSenha(senha)) {
      return res.status(401).send('Credenciais inválidas.')
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' })

    req.session.token = token
    res.redirect('/home')
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).send('Erro no servidor ao fazer login.')
  }
}

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao encerrar a sessão:', err)
      return res.status(500).send('Erro ao encerrar a sessão.')
    }
    res.redirect('/login')
  })
}

module.exports = { registrarUsuario, login, logout }