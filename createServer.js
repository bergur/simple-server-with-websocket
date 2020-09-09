
// We require modules from node. Remember these are automatically cached.
const https = require('https')
const { readFile, readFileSync } = require('fs')
const { join } = require('path')
const { assert } = require('console')

// Function to make our real createServer function using dependency injection
function makeCreateServer(getCookies) {
  return function createServer(args) {
    // Our function will fail if we don't have these paramters
    assert(args.key, 'SSL key is required')
    assert(args.cert, 'SSL cert is required')
    assert(args.ca, 'SSL CA is required')
    
    const serverOptions = {
      key: readFileSync(join(__dirname, args.key)),
      cert: readFileSync(join(__dirname, args.cert)),
      ca: readFileSync(join(__dirname, args.ca))
    }

    const server = https.createServer(serverOptions, (req, res) => {
      // Here is our function we injected
      const cookies = getCookies(req.headers.cookie)
      console.log('got cookies', cookies)

      readFile(join(__dirname, 'temp.html'), (err, data) => {
        if (err) {
          console.log('error', err)
          res.writeHead(404);
          res.end('Error')
        }
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);                          
      })
    })

    return server
  }  
}

module.exports = makeCreateServer
