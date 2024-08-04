const calculateFare = (train, startStop, endStop,decrementAmount) => {
    const stops = train.stops;
    const startIndex = stops.findIndex(stop => stop.stationName === startStop);
    const endIndex = stops.findIndex(stop => stop.stationName === endStop);
  
    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
      throw new Error('Invalid stops');
    }
  
    const distance = endIndex - startIndex; // Simplified fare calculation based on stop distance
    const baseFare = 10*decrementAmount // Example base fare per stop
    return distance * baseFare;
  };
  module.exports={calculateFare}
  