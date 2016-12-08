var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: String,
  startTime: Date,
  updated: Date,
  team: [{
    color: String,
    jammer: {
      name: String,
      number: String,
      jamStat: Number,
      speed: Number, //lap Time
      isLead: Boolean,
      inEngagmentZone: Boolean,
      scoringPass: {
        start: Date,
        number: Number
      }
    },
    blockers: [{
      name: String,
      number: String,
      blockStat: Number,
      penaltyStat: Number,
      onTheTrack: Boolean,
      inBox: Boolean,
      penalty: {
        callTime: Date,
        name: String
      }
    }]
  }]
});

module.exports = mongoose.model('Game', GameSchema);
