const express = require('express');
const router = express.Router();
const {auth,adminAuth} = require('../Middlewares/auth'); 
const trainController = require('../Controller/train');


// @route    POST api/train
// @desc     Create a new Train
// @access   Admin Private
router.post('/',auth, adminAuth, trainController.createTrain);
// @route    Get api/train
// @desc     Get all Train
// @access   Public 
router.get('/', trainController.getAllTrains);
// @route    Get api/train/:id
// @desc     Get a Specific Train by ID
// @access   Public 
router.get('/:id', trainController.getTrainById);
// @route    Patch api/train/:id
// @desc     Update a Train by ID
// @access   Private 
router.patch('/:id',auth, adminAuth, trainController.updateTrain);
// @route    Delete api/train/:id
// @desc     Delete a Train by ID
// @access   Private 
router.delete('/:id',auth, adminAuth, trainController.deleteTrain);



module.exports = router;
