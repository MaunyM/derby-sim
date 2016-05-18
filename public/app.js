(function() {
  var app = angular.module('penaltyBox', ['appChrono','gameServices']);
  app.controller('PenaltyBoxController', ['$scope','Game', function($scope, Game) {
    $scope.penalties = penalties;
    $scope.number = 20;
    $scope.range = function(size) {
      return new Array(size);
    }
    $scope.call = function() {
      Game.query();
    }
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
