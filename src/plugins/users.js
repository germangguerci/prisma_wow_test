const Boom = require('@hapi/boom')
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
          {
            method: 'DELETE',
            path: '/users',
            handler: deleteUserHandler,
        },
        {
            method: 'PUT',
            path: '/users',
            handler: updateUserHandler
        },
        {
            method: 'GET',
            path: '/users',
            handler: readUsersHandler
        }
    ])
  },
}

async function createUserHandler(request, h) {
  const { prisma } = request.server.app
  const payload = request.payload

  try {
    const createdUser = await prisma.adm_usuarios.create({
      data: {
        nombre: payload.nombre,
        apellido: payload.apellido,
        username: payload.username,
        persona_id: payload.persona_id,
        iniciales: payload.iniciales,
        password: payload.password,
        email: payload.email,
        tel: payload.tel, 
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

async function deleteUserHandler(request, h) {
  const { prisma } = request.server.app
  const payload = request.payload

  try {
    const deletedUser = await prisma.adm_usuarios.delete({
      where: {
          id: payload.id
      },
    })
    return h.response("Usuario eliminado", deletedUser).code(201)
  } catch (err) {
    console.log(err)
  }
}

async function updateUserHandler(request, h) {
  const { prisma } = request.server.app
  const payload = request.payload
  try {
    const updatedUser = await prisma.adm_usuarios.update({
      where: {
          id: payload.id
      },
      data: {
          nombre: "ramona",
          apellido: payload.apellido,
          persona_id: payload.persona_id
      }
    })
    return h.response("Usuario actualizado", updatedUser).code(201)
  } catch (err) {
    return Boom.badRequest('invalid query');
  }
}

async function readUsersHandler(request, h) {
  const { prisma } = request.server.app
  const payload = request.payload
  console.log(payload);
  
  try {
    const readUser = await prisma.adm_usuarios.findMany()
    return h.response(readUser).code(201)
  } catch (err) {
    console.log(err)
  }
}




module.exports = usersPlugin; 