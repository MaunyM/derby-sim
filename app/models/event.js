var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  type: String,
  message: String
});

module.exports = mongoose.model('Event', EventSchema);
