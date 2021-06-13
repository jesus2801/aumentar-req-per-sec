const cluster = require('cluster');
const os = require('os');
const cpusLength = os.cpus().length;

const { fastify } = require('fastify');
const analyticServices = require('../analytic.services');
const logger = require('../logger');
const userServices = require('../user.services');
const Master = require('./clusters.config');

if (cluster.isMaster) {
  const master = new Master({ cluster: cluster });

  for (let i = 0; i < cpusLength; i++) master.levantarWorker();

  cluster.on('exit', worker => {
    logger.error(`Cluster number: ${worker.id} is dead`);

    master.levantarWorkerMuerto();
  });
} else {
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
}
