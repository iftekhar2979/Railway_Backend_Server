const express = require('express');
const router = express.Router();
const stationController = require('../Controller/station');
const { adminAuth,auth } = require('../Middlewares/auth');

// @route    POST api/stations
// @desc     Create a new station
// @access   Private
router.post('/', auth,adminAuth, stationController.createStation);

// @route    GET api/stations
// @desc     Get all stations
// @access   Public
router.get('/', stationController.getAllStations);

// @route    GET api/stations/:id
// @desc     Get a station by ID
// @access   Public
router.get('/:id', stationController.getStationById);

// @route    PUT api/stations/:id
// @desc     Update a station
// @access   Private
router.patch('/:id', auth, stationController.updateStation);

// @route    DELETE api/stations/:id
// @desc     Delete a station
// @access   Private
router.delete('/:id', auth, stationController.deleteStation);

module.exports = router;
