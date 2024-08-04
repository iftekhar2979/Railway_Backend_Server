const Station = require('../Model/station');

// Create a new station
exports.createStation = async (req, res) => {
  const { name, location, address } = req.body;

  try {
    const station = new Station({
      name,
      location,
      address
    });
    if(!name||!location||!address){
        return res.status(404).send({msg:"Please provide the accurate information"})
    }
  
    await station.save();
    res.status(201).json({msg:"Station created successfully",station});
  } catch (err) {
    console.log(err)
    res.status(500).send({msg:"Station not created successfully"});
  }
};

// Get all station
exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (err) {

    res.status(404).send({ msg: 'Data not found' });
  }
};

// Get a station by ID
exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ msg: 'Station not found' });
    }
    res.status(200).json(station);
  } catch (err) {
    // console.error(err.message);
    res.status(404).send({msg:err.message});
  }
};

// Update a station
exports.updateStation = async (req, res) => {
  const { name, location, address } = req.body;
  try {
    if(!name||!location||!address){
        return res.status(404).send({msg:"Please provide the accurate information"})
    }

    let station = await Station.findByIdAndUpdate(req.params.id,req.body);
    if (!station) {
      return res.status(404).json({ msg: 'Station not found' });
    }
    res.status(200).json({msg:"station updated successfully"});
  } catch (err) {
  
    res.status(500).send({msg:err.message});
  }
};

// Delete a station
exports.deleteStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) {
      return res.status(404).json({ msg: 'Station not found' });
    }

    res.status(201).json({ msg: 'Station removed successfully' });
  } catch (err) {
  
    res.status(500).send({msg:"station has not been removed! Please try again"});
  }
};
