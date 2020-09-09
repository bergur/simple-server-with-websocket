const getIpAddress = require('./getIpAddress')

// Simple store mechanism to hold our websocket clients from browser.
class ClientStore {
  constructor() {
    this.clients = []
  }

  add(socket) { 
    const client = {
      id: this.clients.length + 1,
      socket: socket,
      ipAddress: getIpAddress(socket.remoteAddress)
    }

    this.clients.push(client)

    return client
  }

  get(id) {
    return this.clients.find(client => client.id === id)
  }

  size() {
    return this.clients.length
  }  
}

module.exports = ClientStore