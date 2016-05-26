var gameServices = angular.module('gameServices', ['ngResource']);

gameServices.factory('Game', ['$resource',
  function($resource){
    return $resource('api/games/:gameId', {});
  }]);
