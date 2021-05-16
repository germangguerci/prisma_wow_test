const usersPlugin = {
  name: 'app/users',
  dependencies: ['prisma'],
  register: async function(server) {
    // here you can use server.app.prisma
    server.route([
        {
            method: 'POST',
            path: '/users',
            handler: createUserHandler,
        },
    ])
  },
}

async function createUserHandler(request, h) {
  const { prisma } = request.server.app
  const payload = request.payload

  try {
    const createdUser = await prisma.adm_usuarios.create({
      data: {
        nombre: "ramon",
        apellido: "lopez",
        username: "xxramonpruebaxx",
        password: "Calamuchita2021!",
        persona_id: 0
      },
      select: {
        id: true,
      },
    })
    return h.response(createdUser).code(201)
  } catch (err) {
    console.log(err)
  }
}
/* async function createUserHandler(request, h) {
  const { prisma } = request.server.app
  const payload = request.payload

  try {
    const createdUser = await prisma.user.create({
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        social: JSON.stringify(payload.social),
      },
      select: {
        id: true,
      },
    })
    return h.response(createdUser).code(201)
  } catch (err) {
    console.log(err)
  }
} */

module.exports = usersPlugin; 