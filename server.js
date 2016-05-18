var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Game     = require('./app/models/game');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

app.use('/api', router);

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/games')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var game = new Game();      // create a new instance of the Bear model
        game.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        game.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Game created!' });
        });

    });

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});


mongoose.connect('mongodb://app:appPassword@ds025232.mlab.com:25232/derby-sim');
