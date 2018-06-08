import { Server } from 'hapi';
import h2o2 from 'h2o2';

const server = new Server({
  host: '0.0.0.0',
  port: process.env.PORT || 8080
});

const startServer = async () => {
  await server.register(h2o2);

  server.route({
    handler: {
      proxy: {
        uri: process.env.API_URL,
        passThrough: true,
        xforward: true
      }
    },
    method: '*',
    path: '/api/{param*}'
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

startServer();
