init();
// Set URL of your WebSocketMain.swf here:
WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf";
// Set this to dump debug message from Flash to console.log:
WEB_SOCKET_DEBUG = true;

// Everything below is the same as using standard WebSocket.

var ws;

function init() {

  // Connect to Web Socket.
  // Change host/port here to your own Web Socket server.
  ws = new WebSocket("ws://pokemonconnect.co:1234/");

  // Set event handlers.
  ws.onopen = function() {
    //ws.send("New user");
  };
  ws.onmessage = function(e) {
    // e.data contains received string.
    output(JSON.parse(e.data));
  };
  ws.onclose = function() {
    output("onclose");
  };
  ws.onerror = function() {
    output("onerror");
  };

}

function onSubmit() {
  var input = document.getElementById("input");
  // You can send message to the Web Socket using ws.send.
  ws.send(input.value);
  output("send: " + input.value);
  input.value = "";
  input.focus();
}

function onCloseClick() {
  ws.close();
}

function output(str) {
    addMarker(str);
}