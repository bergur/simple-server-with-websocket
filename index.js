// Get our modules
const getCookies = require('./getCookies')
const makeCreateServer = require('./createServer')
const makeWebsocketServer = require('./wsServer')
const ClientStore = require('./clientStore')

// We use dependency injection, so we can unit test simple functions like getCookies
const createServer = makeCreateServer(getCookies)

// Create selfsigned certs or from letsyncrypt
const server = createServer({
  key: 'test.key',
  cert: 'test.crt',
  ca: 'test.pem'
})

const store = new ClientStore()

// Dependency injection
makeWebsocketServer(server, store)

// Define our ports and listen to the server
const port = process.env.PORT || 18333
server.listen(port, () => {
  console.log('server listening on port', port)
})