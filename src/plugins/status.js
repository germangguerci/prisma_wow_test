const plugin = {
    name: 'app/status',
    register: async function(server) {
      server.route({
        method: 'GET',
        path: '/',
        handler: (_, h) => {
          return h.response({ up: true }).code(200)
        },
      })
    },
  }

module.exports = plugin;  