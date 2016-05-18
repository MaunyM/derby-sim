this.onmessage = function(event) {
    if (event.data.msg == "start") {
      postMessage("Ready");
    }
}
