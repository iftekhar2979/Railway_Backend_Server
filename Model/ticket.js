const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
  seatNumber: { type: String, required: true },
  class: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: 'Confirmed' },
  bookingDate: { type: Date, default: Date.now },
},{ timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);