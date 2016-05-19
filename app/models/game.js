var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: String,
  updated: {
    type: Date
  },
  player: [{
    name: String,
    number: String
  }]
});

module.exports = mongoose.model('Game', GameSchema);
