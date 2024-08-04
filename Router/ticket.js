const express=require("express")
const router=express.Router()
const ticketController=require("../Controller/ticket")
const { auth } = require("../Middlewares/auth")
router.post("/ticket/book" ,auth,ticketController.bookSeat)
router.get("/ticket",auth,ticketController.getTickets)
router.get("/ticket/:id",auth,ticketController.getSingleTicket)
router.post("/ticket/cancel/:id",auth ,ticketController.cancelSeatBooking)

module.exports=router