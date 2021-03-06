var Event = require('../models/event');
var eventController = require('../controllers/eventController');
var Game = require('../models/game');
var maxPenaltyPower = 500;

module.exports.update = function(game) {
  var events = [];
  var timeSinceLastUpdate = new Date - game.updated;
  if (!game.updated || timeSinceLastUpdate > 1000) {
    game.updated = new Date;
    game.save();
    if (!game.startTime) {
      jamStart(game, events);
    } else {
      wallBlock(game.team[0], game.team[1], events)
      wallBlock(game.team[1], game.team[0], events)
      penalty(game.team[0], events);
      penalty(game.team[1], events);
      game.save();
    }
  }
  return events;
}

var jamStart = function(game, events) {
  game.startTime = new Date;
  game.updated = new Date;
  game.save();
  events.push(eventController.jamStart());
}

var wallBlock = function(teamA, teamB, events) {
  var pass = true;
  //Is jammer in the wall ?
  if (teamB.jammer.inEngagmentZone || ((teamB.jammer.scoringPass.start.getTime() + (teamB.jammer.speed * 1000)) < new Date().getTime())) {
    if (!teamB.jammer.inEngagmentZone) {
      //events.push(eventController.enterEngagementZone(teamB.jammer));
    }
    teamB.jammer.inEngagmentZone = true;
    teamA.blockers.forEach(function(blocker) {
      if (blocker.onTheTrack) {
        checkPenalty(blocker, teamA, events);
        pass = pass && !simpleBlock(blocker, teamB.jammer);
      }
    })

    if (pass) {
      if (!teamA.jammer.isLead && !teamB.jammer.isLead) {
        events.push(eventController.lead(teamB.jammer));
        teamB.jammer.isLead = true;
      } else {
        if (teamB.jammer.scoringPass.number == 0) {
          events.push(eventController.initialPass(teamB.jammer));
        } else {
          events.push(eventController.scoringPass(teamB.jammer));
        }
      }
      teamB.jammer.scoringPass.number += 1;
      teamB.jammer.scoringPass.start = new Date();
      teamB.jammer.inEngagmentZone = false;
    }
  }
}

var penalty = function(team, events) {
  team.blockers.forEach(function(player) {
    if (player.penalty.callTime && ((player.penalty.callTime.getTime() + 8000) < new Date().getTime())) {
      events.push(eventController.enterPenaltyBox(player, team.color));
      player.penalty = null ;
    }
  });
}


var simpleBlock = function(blocker, jammer) {
  var blockPower = Math.floor(Math.random() * blocker.blockStat);
  var jamPower = Math.floor(Math.random() * jammer.jamStat);
  return blockPower > jamPower
}
var checkPenalty = function(blocker, team, events) {
  var gotPenalty = blocker.penaltyStat > Math.floor(Math.random() * maxPenaltyPower);
  if (gotPenalty) {
    blocker.onTheTrack = false;
    blocker.penalty = {
      callTime: new Date()
    }
    events.push(eventController.penalty(blocker, team));
  }
}
