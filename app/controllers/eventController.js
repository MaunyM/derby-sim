var Event = require('../models/event');

module.exports.lead = function(jammer) {
  return {
    type: 'call',
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
    type: 'call',
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

module.exports.enterPenaltyBox = function(player, team) {
  return {
    type: 'enterPenaltyBox',
    time: new Date(),
    message: player.name  + " entre en penalty box",
    player: player,
    team : team
  }
}

module.exports.sitPenaltyBox = function(player, line) {
  return {
    type: 'sitPenaltyBox',
    time: new Date(),
    message: player.name  + " s'assoit en penalty box",
    player: player,
    line : line
  }
}
