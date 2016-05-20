var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: String,
  startTime: Date,
  updated: {
    type: Date
  },
  team: [{
    jammer : {
      name: String,
      number: String,
      jamStat: Number,
      isLead: Boolean,
      scoringPass : Number
    },
    blocker: [{
      name: String,
      number: String,
      blockStat: Number,
    }]
  }]
});

module.exports = mongoose.model('Game', GameSchema);
