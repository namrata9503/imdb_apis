const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema ({
  seriesName: {type: mongoose.Schema.Types.ObjectId, ref: 'TvShow'},
  title: String,
  posterUrl: String,
  season: Number,
  description: String,
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' },
//   stars: [{
//     actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' },
//     characterName: String,
//   }],
  storyline: { type: mongoose.Schema.Types.ObjectId, ref: 'TvShow' },
  genres: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'TvShow',
  }],
  createdAt: { type: Date, default: Date.now},
  modifiedAt: { type: Date, default: Date.now}
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;