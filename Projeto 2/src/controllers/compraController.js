const Compra = require('../models/compra')
const Ticket = require('../models/ticket')

const realizarCompra = async (req, res) => {
  const { ingressoId, quantidade } = req.body
  const ticket = await Ticket.findById(ingressoId)

  if (!ticket || ticket.quantidade < quantidade) {
    return res.send('Estoque insuficiente')
  }

  ticket.quantidade -= quantidade
  await ticket.save()

  await Compra.create({ usuario: req.user.id, ingresso: ingressoId, quantidade })
  res.redirect('/historico')
}

module.exports = { realizarCompra }