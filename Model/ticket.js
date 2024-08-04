const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
  seatNumber: { type: String, required: true },
  startStop: { type: String, required: true },
  endStop: { type: String, required: true },
  fare: { type: Number, required: true },
  status: { type: String, default: 'Confirmed' },
  bookingDate: { type: Date, default: Date.now },
},{ timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);