
const Train = require('../Model/train');
// const user = require('../Model/user');


// Create a new train
exports.createTrain = async (req, res) => {
  const { name, type, capacity, status, departureStation, departureDate, departureTime, arrivalTime, stops, seats, ticketPricing } = req.body;
  if (!name || !type || !capacity || !status || !stops || !seats || !departureStation || !departureTime || !arrivalTime || !departureDate) {
    return res.status(400).json({ error: "Please Kindly Provide the full Information of the train" })
  }

  try {
    const train = new Train({
      name,
      type,
      capacity,
      status,
      departureStation, departureDate, departureTime, arrivalTime,
      stops,
      seats,
      ticketPricing
    });

    await train.save();
    res.status(201).json(train);
  } catch (err) {
    res.status(500).send({ error: "Failed to Add Train" });
  }
};

// Get all trains
exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (err) {
    // console.error(err.message);
    res.status(500).send({ error: err.message });
  }
};

// Get a train by ID
exports.getTrainById = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ msg: 'Train not found' });
    }
    res.status(200).json(train);
  } catch (err) {
    // console.error(err.message);
    res.status(500).send({msg:err.message});
  }
};

// Update train details
exports.updateTrain = async (req, res) => {
  const { name, type, capacity, status, departureStation, departureDate, departureTime, arrivalTime, stops, seats, ticketPricing } = req.body;
  if (!name || !type || !capacity || !status || !stops || !seats || !departureStation || !departureTime || !arrivalTime || !departureDate) {
    return res.status(400).json({ error: "Please Kindly Provide the full Information of the train" })
  }
  try {
    const train = await Train.findByIdAndUpdate(req.params.id,req.body);
    if (!train) {
      return res.status(404).json({ msg: 'Train not found' });
    }

    res.status(200).json({msg:"Train information has been updated"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a train
exports.deleteTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) {
      return res.status(404).json({ msg: 'Train not found' });
    }
   return res.status(200).json({ msg: 'Train removed' });
  } catch (err) {
    res.status(500).send({msg:"Train didn't remove"});
  }
};

// Add seats to a train
exports.addSeats = async (req, res) => {
  const { trainId, seats } = req.body;

  try {
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({ msg: 'Train not found' });
    }

    train.seats.push(...seats);
    await train.save();

    res.json(train);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

