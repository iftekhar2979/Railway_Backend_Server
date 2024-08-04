const express = require('express');
const router = express.Router();
const {auth,adminAuth} = require('../Middlewares/auth'); // Middleware for authentication
const trainController = require('../Controller/train');


router.post('/train',auth, adminAuth, trainController.createTrain);


router.get('/train', trainController.getAllTrains);


router.get('/train/:id', trainController.getTrainById);

router.put('/train/:id', adminAuth, trainController.updateTrain);


router.delete('/train/:id', adminAuth, trainController.deleteTrain);

router.post('/train/seat/add', adminAuth, trainController.addSeats);

router.post('/train/seat/book', auth, trainController.bookSeat);

router.post('/train/seat/cancel', auth, trainController.cancelSeatBooking);

module.exports = router;
