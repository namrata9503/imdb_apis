const mongoose = require('mongoose')

const celebritySchema = new mongoose.Schema({
    name: String,
    details: String,
    photos: Array,
    bornInfo: {
        birthDate : Date,
        birthPlace : String,
        deathDate : Date
    },
    videos: String,
    resume: String,
    contact: Array,
    rank: Date
   
})

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity