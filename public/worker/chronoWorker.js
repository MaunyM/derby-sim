var time = 0;
var lastTime = 0;
var chronoRunning = false;
var yieldTime = 100;

this.onmessage = function(event) {
  if (event.data.msg == "startStop") {
    chronoRunning = !chronoRunning;
    if (chronoRunning) {
      lastTime = new Date().getTime();
      checkTime();
    }
  }
  if (event.data.msg == "reset") {
    if (!chronoRunning) {
      time = 0;
      sendTime();
    }
  }
}

function sendTime() {
  postMessage(time / 1000);
}

function checkTime() {
  if (chronoRunning) {
    var currentTime = new Date().getTime();
    time += currentTime - lastTime;
    lastTime = currentTime;
    sendTime();
    setTimeout("checkTime()", yieldTime);
  }
};
