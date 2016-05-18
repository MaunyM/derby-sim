var gameServices = angular.module('gameServices', ['ngResource']);

gameServices.factory('Game', ['$resource',
  function($resource){
    return $resource('games/:gameId.json', {}, {
      query: {method:'GET', params:{gameId:'games'}, isArray:true}
    });
  }]);
