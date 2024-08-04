const express = require('express');
const router = express.Router();
const {auth,adminAuth} = require('../Middlewares/auth'); // Middleware for authentication
const trainController = require('../Controller/train');
const ticketController = require('../Controller/ticket');


router.post('/train',auth, adminAuth, trainController.createTrain);


router.get('/train', trainController.getAllTrains);


router.get('/train/:id', trainController.getTrainById);

router.patch('/train/:id',auth, adminAuth, trainController.updateTrain);


router.delete('/train/:id',auth, adminAuth, trainController.deleteTrain);



module.exports = router;
