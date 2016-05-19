var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GameSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Game', GameSchema);
