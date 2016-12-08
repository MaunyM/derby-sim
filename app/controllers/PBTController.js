var Event = require('../models/event');
var Game = require('../models/game');
var PBox = require('../models/pBox');

module.exports.check = function(game, pBox, events) {
    var timeSinceLastUpdate = new Date - pBox.updated;
    if (!pBox.updated || timeSinceLastUpdate > 1000) {
        pBox.updated = new Date;
        pBox.save();
        events.forEach(function(event) {
            if (isStarted(pBox.stopWatch))
                pBox.stopWatch = pBox.stopWatch + timeSinceLastUpdate;
            if (event.type == "enterPenaltyBox") {
                console.log("arrivé en PB de " + event.player.name)
                pBox.chairs.forEach(function(chair) {
                    if (isFree(chair)) {
                        //Chrono Start
                        if (!isStarted(pBox.stopWatch))
                            pBox.stopWatch = start()
                        var line = { //
                            in: Math.floor(pBox.stopWatch / 1000),
                            stand: Math.floor(pBox.stopWatch / 1000) + 20,
                            done: Math.floor(pBox.stopWatch / 1000) + 30,
                            skater: event.player.number,
                            team: event.team.color
                        }
                        event.player.inbox = true;
                        pBox.lines.push(line);
                        events.push(eventController.sitPenaltyBox(event.player, line));
                    }
                });
            }
        })
        pBox.save();
        game.save();
    }
}

var isStarted = function(stopWatch) {
    return stopWatch != undefined
}

var isFree = function(chair) {
    return chair.number != undefined
}
var start = function() {
    return 0;
}

var stop = function() {
    return undefined;
}
