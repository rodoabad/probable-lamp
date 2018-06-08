import { Server } from 'hapi';

const server = new Server({
  host: '0.0.0.0',
  port: process.env.PORT || 8080
});

const startServer = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => 'Hello, world!'
  });

  server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => `Hello, ${encodeURIComponent(request.params.name)}!`
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

startServer();
