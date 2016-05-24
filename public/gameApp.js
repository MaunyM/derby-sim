(function() {
  var app = angular.module('appGame', []);
  app.controller('GameController', ['$scope', '$q', 'socket', function($scope, $q, socket) {
    var defer = $q.defer();
    $scope.messages = [];
    $scope.startTime;
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
        if (update.type == "check")
        //Tell the server, we are still interesting
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
      if (event.type == "jamStart") {
        $scope.startTime = new Date(event.time);
      }
      $scope.messages.push(Math.floor((new Date(event.time) - $scope.startTime) / 1000) +  " : " + event.message);
    });

  }]);
  app.directive('game', function() {
    return {
      restrict: 'E',
      templateUrl: 'game.html'
    }
  });
})();
