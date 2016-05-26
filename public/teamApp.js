(function() {
  var app = angular.module('appTeam', []);
  app.controller('TeamController', ['$scope', function($scope) {
    $scope.$on('teams-updated', function(event, teams) {
      console.log("teams-updated", teams);
      $scope.team = teams[$scope.num]
      if ($scope.team.jammer.isLead) {
        $scope.team.jammer.status = "leadJammer"
      }
      $scope.team.blockers.forEach(function(player) {
        if (player.onTheTrack) {
        } else if (player.penalty && player.penalty.sittingTime){
          player.icon = "glyphicon glyphicon-arrow-down"
        } else {
          player.icon = "chevron-left"
        }
      })
    })
  }]);
  app.directive('team', function() {
    return {
      restrict: 'E',
      scope: {
        num: '='
      },
      templateUrl: 'team.html'
    }
  });
})();
