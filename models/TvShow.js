const mongoose = require('mongoose')

const tvShowSchema = new mongoose.Schema({
    title: { type: String, required: true, /**unique: true**/ },
    posterUrl: String,
    trailerUrl: String,
    description: String,
    //director: { type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' },
    writer: { type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' },
    stars: [{
        actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' },
        characterName: String,
    }],
    episode: [{
        season: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode' },
        episodeurl: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode' },
    }],
    photourl: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Photo'
    }],
    storyline: String,
    keywords: [String],
    genres: [String],
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['Upcoming', 'released', 'banned'], default: 'Upcoming' },
})

const tvShow = mongoose.model('TvShow', tvShowSchema);

module.exports = tvShow