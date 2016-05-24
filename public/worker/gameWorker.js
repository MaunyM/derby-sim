var yieldTime = 1000;
var gameRunning = false;
var gameId;

this.onmessage = function(event) {
  if (event.data.msg == "stop") {
    gameRunning = false;
  }
  if (event.data.msg == "gameStarted") {
    gameId = event.data.id;
    gameRunning = true;
    checkGame();
  }
}

//Wake up the game
function checkGame() {
  if (gameRunning) {
    postMessage({
      "type": "check",
      "id": gameId
    });
    setTimeout("checkGame()", yieldTime);
  }
}
