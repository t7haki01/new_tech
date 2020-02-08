var http = require('http');

//http.createServer(function (request, response) {

//    //The following code will print out the incoming request text
//    request.pipe(response);

//}).listen(7777, '127.0.0.1');

//console.log('Listening on port 7777...');

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
        ws.send('log:' + message);
    })

})