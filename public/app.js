(function() {
  var app = angular.module('penaltyBox', ['appChrono', 'gameServices', 'btford.socket-io']);
  app.factory('socket', function(socketFactory) {
    return socketFactory();
  })
  app.controller('PenaltyBoxController', ['$scope', 'Game','socket', function($scope, Game, socket) {
    $scope.messages = ["Yo"];
    $scope.penalties = penalties;
    $scope.number = 20;
    $scope.range = function(size) {
      return new Array(size);
    }
    $scope.call = function() {
      socket.emit('reload', '573dc723cb575520217bb638');
    }
    socket.on('event', function(event) {
      $scope.messages.push(event.message);
    });
  }]);

  var penalties = [{
    period: 1,
    jam: 2,
    isBetweenJams: true,
    skater: {
      team: 'black',
      num: '099',
      pos: 'b',
    },
    time: { in : 0,
      stand: 20,
      done: 30,
      stopWatch: 15
    }
  }, {
    period: 1,
    jam: 5,
    isBetweenJams: true,
    skater: {
      team: 'black',
      num: '099',
      pos: 'b',
    },
    time: { in : 0,
      stand: 20,
      done: 30,
      stopWatch: 15
    }
  }]
})();
