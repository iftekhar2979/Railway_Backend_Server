const Ticket = require('../Model/ticket');
const Train = require('../Model/train');
const WalletTransaction = require("../Model/walletTransection")
const User = require('../Model/user');
const { calculateFare } = require('../Utils/fareCalculate');

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
        class: seat?.class,
        startStop,
        fare,
        endStop,
        status: "Confirmed",
      });
      const transaction = new WalletTransaction({
        user: user._id,
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
      res.status(500).send({msg:'Seat has been not booked'});
    }
  };
  

  // Cancel a seat booking
exports.cancelSeatBooking = async (req, res) => {
    const id = req.params.id;
  
    try {
        const ticketInfo=await Ticket.findById(id)
        const {seatNumber,fare,train:trainId,user:userInfo,startStop,endStop}=ticketInfo
        const user = await User.findById(userInfo._id)
        const train = await Train.findById(trainId);
        if (!train) {
            return res.status(404).json({ msg: 'Train not found' });
        }
        
        const seat = train.seats.find(seat => seat.seatNumber === seatNumber);
        if (!seat) {
            return res.status(404).json({ msg: 'Seat not found' });
        }
        
        if (seat.isBooked) {
         
       
         const ticket = new Ticket({
            _id:id,
            user:userInfo,
            seatNumber,
            train:trainId,
            startStop,endStop,
            fare:0,
            status: "Canceled",
            updatedAt:new Date()
          });
          
          const transaction = new WalletTransaction({
            user: user._id,
            amount: fare,
            type: 'credit',
            description: 'Refund of ticket cancelation',
          });
      
          
          user.wallet = user.wallet+fare
          seat.isBooked = false;
          await transaction.save();
          await user.save()
          await Ticket.findByIdAndUpdate(id,ticket)
          await train.save();
        return  res.json({ msg: 'Seat booking canceled successfully' });
      }
  
   
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Get all Ticket
exports.getTickets = async (req, res) => {
    try {
      const tickets = await Ticket.find({user:req.decoded.user.id});
      res.status(200).json(tickets);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };
  //Get Single Ticket
exports.getSingleTicket = async (req, res) => {
    try {
      const tickets = await Ticket.findById(req.params.id);
      res.status(200).json(tickets);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };