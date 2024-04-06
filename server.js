// server.js

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let suggestions = [];

app.use(express.static('public'));

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    // Send existing suggestions to the newly connected client
    ws.send(JSON.stringify(suggestions));

    ws.on('message', function incoming(message) {
        console.log('Received message:', message);

        // Add the received suggestion to the list of suggestions
        const suggestion = JSON.parse(message);
        suggestions.push(suggestion);

        // Broadcast the new suggestion to all connected clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
