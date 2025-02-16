const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
  nome: String,
  preco: Number,
  quantidade: Number
})

module.exports = mongoose.model('Ticket', ticketSchema)