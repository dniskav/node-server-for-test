const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors);

const server = http.createServer(app);

const wss =  new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Conected client!');

  ws.on('message', message => {
    const response = message.toString();
    console.log(response);

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(response);
      }
    });
  });

  ws.on('close', () => {
    console.log('Disconnected client!"')
  });
});

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});