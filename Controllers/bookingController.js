const BookingModel = require('../Models/BookingModel');
const EventModel = require("../Models/EventModel");

const bookTicketsForEvent = async(req, res) =>{
    try{
        const { eventId, numberOfTicketsBooked } = req.body;
        const userId = req.user.id; // Extract authenticated user ID
        
        //check if event exist
        const event = await EventModel.findById(eventId)
        if(!event){
            return res.status(404).json({message : "event not found"})
        }
        
        // Check if there are enough tickets available
        if(event.remainingTickets < numberOfTicketsBooked){
            return res.status(404).json({message : "Not enough available tickets"})
        }

        // Calculate total price
        const totalPrice = event.ticketPrice * numberOfTicketsBooked

        // create a booking
        const booking = new BookingModel({
            user: userId,
            event: eventId,
            numberOfTicketsBooked,
            totalPrice,
            bookingStatus: 'pending'
        })

        await booking.save()

        // Update Remaining Tickets
        event.remainingTickets -= numberOfTicketsBooked
        await event.save()

        res.status(200).json({message : "Booking successful!", booking})
    } catch(err){
        res.status(404).json({ message: err.message} )
    }
}

 const getBookingDetails = async(req, res) =>{
    try{
        // Find the booking by ID
        const booking = await BookingModel.findById(req.params.id);
        return res.status(200).json(booking);
    } catch(err){
        res.status(400).json({message : err.message})
    }
 }

 const deleteBooking = async(req, res) =>{
    try{
        // Find the booking by ID
        const booking = await BookingModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({user,msg:"Booking deleted successfully"});
    } catch(err){
        res.status(400).json({message : err.message})
    }
 }

module.exports = {
    bookTicketsForEvent,
    getBookingDetails,
    deleteBooking
}