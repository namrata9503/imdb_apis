const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title : String,
    slug: String,
    type: String,
    writer: String,
    director: String,
    year: Date,
    celebrities: Array,
    showTime: Date,
    duration: Number,
    trailor: String,
    rating: Number,
    social: {
        facebook: String,
        twitter: String
    }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie