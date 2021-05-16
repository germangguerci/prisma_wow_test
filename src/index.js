const {createServer, startServer} = require('./server');

createServer()
  .then(startServer)
  .catch(err => {
    console.log(err)
  })