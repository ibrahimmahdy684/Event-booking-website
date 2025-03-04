const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    ticket_price:{
        type:Number,
        required:true
    },
    organizer: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set to the current date and time
    }

    
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
    