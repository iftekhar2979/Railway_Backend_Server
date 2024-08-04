const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, required: true },
  schedule: [
    {
      departureStation: { type: String, required: true },
      arrivalStationId:{type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
      arrivalStation: { type: String, required: true },
      departureTime: { type: Date, required: true },
      arrivalTime: { type: Date, required: true },
      daysOfOperation: { type: [String], required: true },
    }
  ],
  createdAt:{type:Date,required: true },
  
},
{ timestamps: true }
);

module.exports = mongoose.model('Train', TrainSchema);
