var Event = require('../models/event');

module.exports.lead = function(jammer) {
  return {
    type: 'jam',
    time: new Date(),
    message: jammer.name + " prend le lead"
  }
}

module.exports.initialPass = function(jammer) {
  return {
    type: 'jam',
    time: new Date(),
    message: jammer.name + " sort de son passage initial"
  }
}

module.exports.enterEngagementZone = function(jammer) {
  return {
    type: 'jam',
    time: new Date(),
    message: jammer.name + " rentre dans la zone d'engagement"
  }
}

module.exports.scoringPass = function(jammer) {
  return {
    type: 'jam',
    time: new Date(),
    message: jammer.name + " sort de son passage marquant " + jammer.scoringPass.number
  }
}

module.exports.penalty = function(player, team) {
  return {
    type: 'penalty',
    time: new Date(),
    message: player.number + " " + team.color +" cutting"
  }
}

module.exports.jamStart = function() {
  return {
    type: 'jamStart',
    time: new Date(),
    message: "Debut du jam"
  }
}
