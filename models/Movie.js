const mongoose = require('mongoose')
// const actorSchema = new mongoose.Schema({
//   actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
//   characterName: String,
// })
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, /**unique: true**/ },
    slug: String,
    type: String,
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' },
    writer: { type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' },
    year: Date,
    // celebrities: [{
    //     actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' },
    //     characterName: String,
    // }],
    showTime: Date,
    duration: Number,
    trailor: String,
    rating: Number,
    status: { type: String, enum: ['pre-released', 'released', 'banned'], default: 'pre-released' },
    createdAt: Date,
    modifiedAt: Date,
    social: {
        facebook: String,
        twitter: String
    }
})

movieSchema.pre('save', function (next) {
    this.modifiedAt = Date.now()
    next()
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie