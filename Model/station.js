const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  name: { type: String, required: true , unique: true},
  location: {
    latitude: { type: Number, required: true , unique: true},
    longitude: { type: Number, required: true , unique: true},
  },
  address: { type: String, required: true , unique: true},
});

module.exports = mongoose.model('Station', StationSchema);
