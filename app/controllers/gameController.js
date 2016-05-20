var Event = require('../models/event');
var eventController = require('../controllers/eventController');
var Game = require('../models/game');

module.exports.update = function(game) {
  var events = [];
  var timeSinceLastUpdate = Math.floor((new Date - game.updated) / 1000);
  if (!game.updated || timeSinceLastUpdate > 1) {
    console.log("TimeSinceLastUpdate : " + timeSinceLastUpdate);
    game.updated = new Date;
    game.save();
    if (!game.startTime) {
      jamStart(game, events);
    } else {
      wallBlock(game.team[0], game.team[1], events)
      wallBlock(game.team[1], game.team[0], events)
      game.save();
    }
  }
  return events;
}

var jamStart = function(game, events) {
  game.startTime = new Date;
  game.updated = new Date;
  game.save();
  events.push({
    type: 'jam',
    message: 'Jam Start'
  });
}

var wallBlock = function(teamA, teamB, events) {
  var pass = true;
  teamA.blocker.forEach(function(blocker) {
    result = simpleBlock(blocker, teamB.jammer);
    pass = pass && (!result.success);
    if (result.success) {
      console.log(blocker.name + " bloque " + teamB.jammer.name);
    } else {
      console.log(teamB.jammer.name + " passe " + blocker.name);
    }
  })

  if (pass) {
    console.log(teamB.jammer + " passe le mur");
    if (!teamA.jammer.isLead && !teamB.jammer.isLead) {
      events.push(eventController.lead(teamB.jammer));
      teamB.jammer.isLead = true;
    } else {
      if (teamB.jammer.scoringPass == 0) {
        events.push(eventController.initialPass(teamB.jammer));
      } else {
        events.push(eventController.scoringPass(teamB.jammer));
      }
    }
    teamB.jammer.scoringPass += 1;
  }
}

var simpleBlock = function(blocker, jammer) {
  var blockPower = Math.floor(Math.random() * blocker.blockStat);
  var jamPower = Math.floor(Math.random() * jammer.jamStat);
  return {
    "success": blockPower > jamPower,
    "events": []
  }
}
