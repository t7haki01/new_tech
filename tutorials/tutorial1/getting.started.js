//Tutorial 1


//var connection = new WebSocket('ws://html5rocks.websocket.org/echo', ['soap', 'xmpp']);
const WebSocket = require('ws');
let ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function (e) {
    console.log("Connection open...");
    ws.send("Hello Websockets!");
};

ws.onmessage = function (e) {
    console.log("Received message: " + e.data);
    ws.close();
};

ws.onclose = function (e) {
    console.log("Connection closed.");
};