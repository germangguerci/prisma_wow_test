const Hapi = require('@hapi/hapi');
const statusPlugin = require('./plugins/status');
const prismaPlugin = require('./plugins/prisma');
const usersPlugin = require('./plugins/users');

const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  })
  
   async function createServer() {
    await server.register([statusPlugin, prismaPlugin, usersPlugin])
    await server.initialize()
  
    return server
  }
  
  async function startServer(server) {
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
  }
  
  process.on('unhandledRejection', err => {
    console.log(err)
    process.exit(1)
  })

module.exports = {createServer, startServer}