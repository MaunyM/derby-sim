(function() {
  var app = angular.module('appGame', []);
  app.controller('GameController', ['$scope', '$q', 'socket', function($scope, $q, socket) {
    var defer = $q.defer();
    $scope.messages = [];
    if (!!window.Worker) {
      var worker;
      $scope.start = function() {
        if (worker)
          worker.terminate();
        worker = new Worker("worker/gameWorker.js");
        worker.onmessage = function(e) {
          defer.notify(e.data);
        }
        socket.emit('start');
      };
      $scope.stop = function() {
        worker.terminate();
      };
      defer.promise.then(function(data) {
        console.log('Game promise Success');
      }, function(raison) {
        console.log('Game promise Failed');
      }, function(update) {
        console.log(update);
        if (update.type == "check")
          socket.emit('check', update.id);
      });
    }
    socket.on('gameStarted', function(data) {
      worker.postMessage({
        'msg': 'gameStarted',
        'id': data.id
      });
    });
    socket.on('event', function(event) {
      $scope.messages.push(event.message);
    });

  }]);
  app.directive('game', function() {
    return {
      restrict: 'E',
      templateUrl: 'game.html'
    }
  });
})();
