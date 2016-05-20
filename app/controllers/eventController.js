var Event = require('../models/event');

module.exports.lead = function(jammer) {
  return {
    type: 'jam',
    message: jammer.name + " prend le lead"
  }
}

module.exports.initialPass = function(jammer) {
  return {
    type: 'jam',
    message: jammer.name + " sort de son passage initial"
  }
}

module.exports.scoringPass = function(jammer) {
  return {
    type: 'jam',
    message: jammer.name + " sort de son passage marquant " + jammer.scoringPass
  }
}
