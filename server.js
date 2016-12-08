var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var io = require('socket.io')(http);

var Game = require('./app/models/game');
var PenaltyBox = require('./app/models/pBox');
var gameController = require('./app/controllers/gameController');
var PBTController = require('./app/controllers/PBTController');

var gameData = require('./app/data/game.json');

var nso = {}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var router = express.Router();

app.use('/api', router);

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/games')
    .post(function(req, res) {
        var game = new Game(gameData);
        game.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Game created!'
            });
        });

    })
    .get(function(req, res) {
        Game.find(function(err, games) {
            if (err)
                res.send(err);

            res.json(games);
        });
    });;

router.route('/games/:game_id')
    .get(function(req, res) {
        Game.findById(req.params.game_id, function(err, game) {
            if (err)
                res.send(err);
            res.json(game);
        });
    })
    .put(function(req, res) {
        Game.findById(req.params.game_id, function(err, game) {
            if (err)
                res.send(err);
            game.name = req.body.name;
            game.save(function(err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'Game updated!'
                });
            });
        });
    })
    .delete(function(req, res) {
        Game.remove({
            _id: req.params.game_id
        }, function(err, game) {
            if (err)
                res.send(err);

            res.json({
                message: 'Successfully deleted'
            });
        });
    });

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('start', function(gameId) {
        var game = new Game(gameData);
        game.save(function(err) {
            if (err)
                io.emit('error', err);
            io.emit('gameStarted', {
                "id": game._id
            });
        });
        var pbox = new PenaltyBox({
            gameId: game._id,
            stopWatch: undefined,
            updated: new Date,
            chairs: [{}, {}]
        });
        pbox.save(function(err) {
            if (err)
                io.emit('error', err);
        });
    });
    socket.on('check', function(gameId) {
        var events = [];
        Game.findById(gameId, function(err, game) {
            if (err)
                console.log('Erreur au chargement du game: ' + err);
            events = gameController.update(game);
            PenaltyBox.findOne({
                'gameId': game._id
            }, function(err, pbox) {
                if (err) return handleError(err);
                PBTController.check(game, pbox, events);
                events.forEach(function(event) {
                    io.emit('event', event);
                });
            })

        });
    });
});

http.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});


mongoose.connect('mongodb://app:appPassword@ds025232.mlab.com:25232/derby-sim');
