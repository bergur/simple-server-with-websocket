const WebSocket = require('ws');
const { assert } = require('console');

// Our main function that takes in dependencies
function makeWebsocketServer (httpServer, clientStore) {
  assert(httpServer, 'HTTPS Server is required')

  const websocketServer = new WebSocket.Server({ server: httpServer });

  websocketServer.on('connection', client => {
    const createdClient = clientStore.add(client)
    client.on('message', handleMessage(createdClient))
    client.send('Connection confirmed')
    console.log('Total of:' + clientStore.size() + ' clients')
  })

  return websocketServer;
}

module.exports = makeWebsocketServer

// This is a callback function for client.on('message)
function handleMessage(client) {
  return function (message) {
    // do your magic here
    console.log(`I received message: ${message} from user ${client.id}`);  
  }
}