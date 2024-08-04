const Train = require('../Model/train');
const cron = require('node-cron');
const createTrains = async () => {
    
  const trainData = [
    {
      name: "Express Train 101",
      type: "Express",
      capacity: 300,
      status: "active",
      departureStation: "Central Station",
      departureDate:new Date(), // Today's date
      departureTime: "08:00 AM",
      arrivalTime: "10:30 AM",
      stops: [
        { stationName: "Central Station", arrivalTime: "09:00 AM", departureTime: "09:15 AM", sequence: 1 },
        { stationName: "North Station", arrivalTime: "09:45 AM", departureTime: "10:00 AM", sequence: 2 },
        { stationName: "South Station", arrivalTime: "10:15 AM", departureTime: "10:30 AM", sequence: 3 }
      ],
      seats: [
        { seatNumber: "1A", isBooked: false, class: "economy" },
        { seatNumber: "1B", isBooked: false, class: "economy" },
        { seatNumber: "2A", isBooked: false, class: "business" },
        { seatNumber: "2B", isBooked: false, class: "business" },
        { seatNumber: "3A", isBooked: true, class: "economy" }
      ],
     
    },
    // Add 4 more train objects with different data
    {
      name: "Express Train 102",
      type: "Express",
      capacity: 300,
      status: "active",
      departureStation: "West Station",
      departureDate:new Date(),
      departureTime: "08:30 AM",
      arrivalTime: "11:00 AM",
      stops: [
        { stationName: "West Station", arrivalTime: "09:30 AM", departureTime: "09:45 AM", sequence: 1 },
        { stationName: "North Station", arrivalTime: "10:15 AM", departureTime: "10:30 AM", sequence: 2 },
        { stationName: "East Station", arrivalTime: "10:45 AM", departureTime: "11:00 AM", sequence: 3 }
      ],
      seats: [
        { seatNumber: "1A", isBooked: false, class: "economy" },
        { seatNumber: "1B", isBooked: false, class: "economy" },
        { seatNumber: "2A", isBooked: false, class: "business" },
        { seatNumber: "2B", isBooked: false, class: "business" },
        { seatNumber: "3A", isBooked: true, class: "economy" }
      ],
     
    },
    {
      name: "Express Train 103",
      type: "Express",
      capacity: 300,
      status: "active",
      departureStation: "East Station",
      departureDate:new Date(),
      departureTime: "09:00 AM",
      arrivalTime: "11:30 AM",
      stops: [
        { stationName: "East Station", arrivalTime: "10:00 AM", departureTime: "10:15 AM", sequence: 1 },
        { stationName: "North Station", arrivalTime: "10:45 AM", departureTime: "11:00 AM", sequence: 2 },
        { stationName: "West Station", arrivalTime: "11:15 AM", departureTime: "11:30 AM", sequence: 3 }
      ],
      seats: [
        { seatNumber: "1A", isBooked: false, class: "economy" },
        { seatNumber: "1B", isBooked: false, class: "economy" },
        { seatNumber: "2A", isBooked: false, class: "business" },
        { seatNumber: "2B", isBooked: false, class: "business" },
        { seatNumber: "3A", isBooked: true, class: "economy" }
      ],
     
    },
    {
      name: "Express Train 104",
      type: "Express",
      capacity: 300,
      status: "active",
      departureStation: "South Station",
      departureDate:new Date(),
      departureTime: "09:30 AM",
      arrivalTime: "12:00 PM",
      stops: [
        { stationName: "South Station", arrivalTime: "10:30 AM", departureTime: "10:45 AM", sequence: 1 },
        { stationName: "North Station", arrivalTime: "11:15 AM", departureTime: "11:30 AM", sequence: 2 },
        { stationName: "East Station", arrivalTime: "11:45 AM", departureTime: "12:00 PM", sequence: 3 }
      ],
      seats: [
        { seatNumber: "1A", isBooked: false, class: "economy" },
        { seatNumber: "1B", isBooked: false, class: "economy" },
        { seatNumber: "2A", isBooked: false, class: "business" },
        { seatNumber: "2B", isBooked: false, class: "business" },
        { seatNumber: "3A", isBooked: true, class: "economy" }
      ],
     
    },
    {
      name: "Express Train 105",
      type: "Express",
      capacity: 300,
      status: "active",
      departureStation: "Central Station",
      departureDate:new Date(),
      departureTime: "10:00 AM",
      arrivalTime: "12:30 PM",
      stops: [
        { stationName: "Central Station", arrivalTime: "11:00 AM", departureTime: "11:15 AM", sequence: 1 },
        { stationName: "North Station", arrivalTime: "11:45 AM", departureTime: "12:00 PM", sequence: 2 },
        { stationName: "West Station", arrivalTime: "12:15 PM", departureTime: "12:30 PM", sequence: 3 }
      ],
      seats: [
        { seatNumber: "1A", isBooked: false, class: "economy" },
        { seatNumber: "1B", isBooked: false, class: "economy" },
        { seatNumber: "2A", isBooked: false, class: "business" },
        { seatNumber: "2B", isBooked: false, class: "business" },
        { seatNumber: "3A", isBooked: true, class: "economy" }
      ],
     
    }
  ];

  try {
    for (const train of trainData) {
      const newTrain = new Train(train);
      await newTrain.save();
      console.log('Train created:', newTrain.name);
    }
  } catch (err) {
    console.error('Failed to create trains:', err.message);
  }
};





//Schedule a task to run every day
cron.schedule('0 8 * * *', () => {
    console.log('Running the train creation job every day at 8 AM');
    createTrains();
  }, {
    scheduled: true,
    timezone: "America/New_York" // Adjust to your valid timezone
  });