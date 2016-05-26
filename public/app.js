(function() {
  var app = angular.module('penaltyBox', ['appChrono', 'appGame', 'gameServices', 'btford.socket-io']);
  app.factory('socket', function(socketFactory) {
    return socketFactory();
  })
  app.controller('PenaltyBoxController', ['$scope', function($scope) {
    $scope.penalties = penalties;
    $scope.number = 20;
    $scope.chairs = [{
      message: "Libre",
      free: true
    }, {
      message: "Libre",
      free: true
    }];
    $scope.range = function(size) {
      return new Array(size);
    }
    $scope.$on('enterPenaltyBox', function(event, player) {
      console.log("enterPenaltyBox", player)
      var sit = false;
      $scope.chairs.forEach(function(chair) {
        if (chair.free && !sit) {
          chair.free = false;
          chair.message = player.name;
          sit = true;
        }
      })
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
