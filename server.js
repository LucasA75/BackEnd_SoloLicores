// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });

// CORS
fastify.register( require('@fastify/cors'), {} );

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'Pequeño World' };
});

// para probar en cliente recibir datos por GET y por POST 
// fetch('http://localhost:3000/form', {method: 'POST', body: JSON.stringify({a:'uno', b:'dos'}), headers: {'Content-Type': 'application/json'} }).then(r=>r.json()).then(d=>console.dir(d));
fastify.route({
  method: ['GET'],
  url: '/registro',
  handler: (request, reply) => {
    const datosGET  = request.query;
    const datosPOST = request.body;
    return { datosGET, datosPOST };
  }
});

fastify.route({
  method:["GET","POST","PUT","DELETE"],
  url:"/categoria",
  handler:require("./src/categoria")
})


/* POST para enviar datos */
fastify.post("/registro", require("./src/registro.js")); 
fastify.post("/login", require("./src/login.js")); 
fastify.get("/usuario/check", require("./src/check.js"));
// Crea una ruta en Fastify para obtener todos los usuarios
fastify.get('/usuarios', async (request, reply) => {
    try {
      // Obtiene la lista de usuarios de Firebase Authentication
      const listUsersResult = await admin.auth().listUsers();
      const usuarios = listUsersResult.users.map(user => {
        return {
          id: user.uid,
          email: user.email
          // Agrega aquí los campos adicionales que desees obtener
        };
      });
      return usuarios;
    } catch (error) { 
      // Maneja los errores de manera adecuada
      reply.status(500).send({ error: 'Error al obtener los usuarios' });
    }
  })



// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err) 
    process.exit(1)
  }
}
start()