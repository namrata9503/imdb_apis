const mongoose = require('mongoose')

const celebritySchema = new mongoose.Schema({
    name: String,
    pictureUrl: String,
    details: String,
    photos: Array,
    bornInfo: {
        birthDate : Date,
        birthPlace : String,
        deathDate : Date
    },
    height: {
        value: Number,
        unit: {type: String, enum: ['cm', 'inch'], default: 'cm'}
      },
    videos: String,
    resume: String,
    contact: Array,
    rank: Date,
    createdAt: { type: Date, default: Date.now},
    modifiedAt: Date
   
})

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity