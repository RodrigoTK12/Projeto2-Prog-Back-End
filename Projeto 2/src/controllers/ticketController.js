const Ticket = require('../models/ticket')

const listarIngressos = async (req, res) => {
  const ingressos = await Ticket.find()
  res.render('home', { ingressos })
}

const criarIngresso = async (req, res) => {
  const { nome, preco, quantidade } = req.body
  await Ticket.create({ nome, preco, quantidade })
  res.redirect('/admin')
}

module.exports = { listarIngressos, criarIngresso }