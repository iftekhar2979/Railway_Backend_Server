const Ticket = require('../Model/ticket');
const Train = require('../Model/train');
const WalletTransaction = require("../Model/walletTransection")
const User = require('../Model/user');
const { calculateFare } = require('../Utils/fareCalculate');
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
    res.status(200).json(train);
  } catch (err) {
    console.error(err.message);
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
    res.json(train);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update train details
exports.updateTrain = async (req, res) => {
  const { name, type, capacity, status, schedule, stops, seats } = req.body;

  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ msg: 'Train not found' });
    }

    if (name) train.name = name;
    if (type) train.type = type;
    if (capacity) train.capacity = capacity;
    if (status) train.status = status;
    if (schedule) train.schedule = schedule;
    if (stops) train.stops = stops;
    if (seats) train.seats = seats;

    await train.save();
    res.json(train);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a train
exports.deleteTrain = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ msg: 'Train not found' });
    }

    await train.remove();
    res.json({ msg: 'Train removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
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

// Book a seat
exports.bookSeat = async (req, res) => {
  const { trainId, seatNumber, userId, startStop, endStop } = req.body;

  try {
    const train = await Train.findById(trainId);
    const user = await User.findById(userId)
    if (!train) {
      return res.status(404).json({ msg: 'Train not found' });
    }

    const isStartStopExist=train?.stops?.find(stop=>stop.stationName===startStop)
    const isEndStopExist=train?.stops?.find(stop=>stop.stationName===endStop)
    if(!isStartStopExist){
      return res.status(404).json({ msg: 'Departure stop not found' });
    }
    if(!isEndStopExist){
      return res.status(404).json({ msg: 'Arival stop not found' });
    }
    const seat = train.seats.find(seat => seat.seatNumber === seatNumber);

    const findSeatTypePricing = train?.ticketPricing?.find(seatType => seat.class === seatType.class)
    let decrementAmount = findSeatTypePricing.price
    let fare = calculateFare(train, startStop, endStop, decrementAmount)
  
    if (fare > user.wallet) {
      return res.status(404).json({ msg: 'You have not enough balance to purchase the seat' });

    }
    if (!seat) {
      return res.status(404).json({ msg: 'Seat not found' });
    }
    if (seat.isBooked) {
      return res.status(400).json({ msg: 'Seat already booked' });
    }

    const ticket = new Ticket({
      user: user._id,
      train: train._id,
      seatNumber,
      class: seat.class,
      startStop,
      fare,
      endStop,
      status: "Confirmed",
    });
    const transaction = new WalletTransaction({
      user: req.decoded.user.id,
      amount: fare,
      type: 'debit',
      description: 'Bought Ticket . Fund Withdraw',
    });

    
    user.wallet = user.wallet-fare
    seat.isBooked = true;
    await transaction.save();
    await user.save()
    await ticket.save()
    await train.save();

    res.status(200).json({ msg: 'Seat booked successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Cancel a seat booking
exports.cancelSeatBooking = async (req, res) => {
  const { trainId, seatNumber } = req.body;

  try {
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({ msg: 'Train not found' });
    }

    const seat = train.seats.find(seat => seat.seatNumber === seatNumber);
    if (!seat) {
      return res.status(404).json({ msg: 'Seat not found' });
    }

    if (!seat.isBooked) {
      return res.status(400).json({ msg: 'Seat not booked' });
    }

    seat.isBooked = false;
    await train.save();

    res.json({ msg: 'Seat booking canceled successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
