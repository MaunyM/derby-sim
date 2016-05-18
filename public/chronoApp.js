(function() {
  var app = angular.module('chrono', []);
  app.controller('ChronoController', ['$scope','$q', function($scope, $q) {
    var defer = $q.defer();
    $scope.time = 0;
    if (!!window.Worker) {
      var worker = new Worker("worker/chronoWorker.js");
      worker.onmessage = function(e) {
        defer.notify(e.data);
      }
      $scope.startStop = function() {
        worker.postMessage({
          'msg': 'startStop'
        });
      };
      $scope.reset = function() {
        worker.postMessage({
          'msg': 'reset'
        });
      };
      defer.promise.then(function(data) {
        console.log('Chrono promise Success');
      }, function(raison){
        console.log('Chrono promise Failed');
      }, function(update) {
        $scope.time = update;
      });
    }

  }]);
  app.directive('chrono', function() {
    return {
      restrict: 'E',
      templateUrl: 'chrono.html'
    }
  });
})();
