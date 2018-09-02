const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
   
    awards: Array,
    nominees: Array,
    winners: Array,
    celebrities: Array,
   
    photos: Array,
    details: String,
    time: Date,
    social: {
        facebook: String,
        twitter: String
    }

})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event