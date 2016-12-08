var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PenaltyBoxSchema = new Schema({
  gameId: String,
  updated: Date,
  stopWatch: Number,
  color : String,
  chairs:[
    {
      number : Number,
      stand : Boolean
    }
  ],
  lines: [{
    period: Number,
    jam: Number,
    btwJam: Boolean,
    team: String,
    skater: Number,
    position: String,
    in : Number,
    stand: Number,
    done: Number,
    stopWatchEndOfJam: [Number]
  }]
});

module.exports = mongoose.model("PenaltyBox", PenaltyBoxSchema);
