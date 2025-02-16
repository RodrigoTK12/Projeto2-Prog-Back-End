const mongoose = require('mongoose')

const compraSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ingresso: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  quantidade: Number,
  data: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Compra', compraSchema)