const express = require("express")
const router = express.Router()
const ticketController = require("../Controller/ticket")
const { auth } = require("../Middlewares/auth")

// @route    POST api/ticket/book
// @desc     Create a ticket booking
// @access    Private
router.post("/book", auth, ticketController.bookSeat)
// @route    GET api/ticket
// @desc     Get all ticket user booked
// @access    Private
router.get("/", auth, ticketController.getTickets)
// @route    GET api/ticket/:id
// @desc     Get a Single Ticket by ID
// @access    Private
router.get("/:id", auth, ticketController.getSingleTicket)
// @route    POST api/ticket/:id
// @desc     Cancel a ticket and refund by ID
// @access    Private
router.post("/cancel/:id", auth, ticketController.cancelSeatBooking)

module.exports = router