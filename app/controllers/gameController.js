var Event = require('../models/event');
var Game = require('../models/game');

var minimumTimeBetweenUpdate = 1000;
var msInGame = 60 * 60 * 1000;

module.exports.update = function(game) {
  var events = [];
  var timeSinceLastUpdate = (new Date - game.updated) > minimumTimeBetweenUpdate
  if (timeSinceLastUpdate > minimumTimeBetweenUpdate) {
    game.player.forEach(function(player) {
      var event = new Event();
      event.type = 'penaly';
      event.message = 'Red ' + player.number + ' Cutting';
      events.push(event);
      console.log('message: ' + event);
    });
    game.updated = new Date;
    game.save();
  };
  return events;
}
