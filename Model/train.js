const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  class: { type: String, required: true },

});
const ScheduleSchema = new mongoose.Schema({
  departureStation: { type: String, required: true },
  day: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true }
});

const StopSchema = new mongoose.Schema({
  stationName: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  departureTime: { type: String, required: true },
  sequence: { type: Number, required: true }
});
const TicketPricingSchema = new mongoose.Schema({
  class: { type: String, required: true, enum: ['vip', 'business', 'economy'] },
  price: { type: Number, required: true }
});


const TrainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, required: true },
  departureStation: { type: String, required: true },
  departureDate:{type:Date,required:true},
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  stops: [StopSchema],
  seats: [SeatSchema],
  ticketPricing: {
    type: [TicketPricingSchema],
    default: [
      { class: 'vip', price: 100 },
      { class: 'business', price: 80 },
      { class: 'economy', price: 50 }
    ]
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('Train', TrainSchema);
