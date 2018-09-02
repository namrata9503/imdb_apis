const mongoose = require('mongoose')

const tvShowSchema = new mongoose.Schema({
    title: String,
    slug: String,
    episodes : Array,
    writer: String,
    director: String,
    startingDate : Date,
    celebrities: Array,
    showTime: Date,
    duration: Number,
    ranking: String,
    rating: Number,
    social: {
        facebook: String,
        twitter: String
    }
})

const tvShow = mongoose.model('TvShow', tvShowSchema);

module.exports = tvShow