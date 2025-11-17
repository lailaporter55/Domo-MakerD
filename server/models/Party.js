const mongoose = require('mongoose'); 
const _ = require('underscore'); 

const PartySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
    }, 
    time: {
        type: Date,
        required: true,
    }, 
    price: {
        type: Number,
        min: 100,
        required: true,
    }, 
    attendees:{
        type: Number, 
        required : true,
        min: 5,
    },
    owner:{
        type: mongoose.Schema.ObjectId, 
        required: true, 
        ref: 'Account', 
    }, 
});

module.exports = mongoose.model('Party', PartySchema);