const { fastify } = require('fastify');
const analyticServices = require('../analytic.services');
const logger = require('../logger');
const userServices = require('../user.services');

const app = fastify();

app.get('/users', async (req, reply) => {
  try {
    const users = userServices.get();
    reply.status(200).send(users);

    analyticServices.reportGetUsers();
  } catch (e) {
    next(e);
  }
});

app.setErrorHandler((e, req, reply) => {
  //manejr una lógica de errores
  logger.error(
    typeof e === 'object'
      ? Object.keys(e).length === 0
        ? e
        : JSON.stringify(e)
      : e
  );
});

app.listen(3000, '0.0.0.0');
logger.info('Servidor escuchando en el puerto 3000');
