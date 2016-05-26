var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  gameId: String,
  period: Number,
  jam: Number,
  btwJam : Boolean,
  team: String,
  skater: Number,
  position: String,
  in: Number,
  stand: Number,
  done: Number,
  stopWatchEndOfJam : [Number]
});

module.exports = mongoose.model('Event', EventSchema);
