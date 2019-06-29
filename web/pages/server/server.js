var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    response.write(`
    <script>
    var socket = new WebSocket("ws://localhost:8889");

    socket.onopen = function(e) {
        var n = Math.floor(Math.random() * 1000);
        alert("Envia " + n);
        socket.send(n);
    };

    socket.onmessage = function(e) {
        alert("Recibe " + e.data);
    };
    </script>
    `);
    response.end();
});
server.listen(8889, function() {});

wsServer = new WebSocketServer({
    httpServer: server
});

var clientes = [];

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    clientes.push(connection);
    connection.on('message', function(message) {
        clientes.map(c => c.send(JSON.stringify(message.utf8Data)));
    });

    connection.on('close', function(connection) {
    });
});