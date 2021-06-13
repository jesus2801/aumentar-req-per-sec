const express = require('express');
const analyticServices = require('../analytic.services');
const logger = require('../logger');
const userServices = require('../user.services');

const app = express();

app.get('/users', async (req, res, next) => {
  try {
    logger.info('petición en: /users');
    const users = userServices.get();
    res.status(200).send(users);

    analyticServices.reportGetUsers();
  } catch (e) {
    next(e);
  }
});

app.use((e, req, res, next) => {
  //manejar una lógica de errores
  logger.error(
    typeof e === 'object'
      ? Object.keys(e).length === 0
        ? e
        : JSON.stringify(e)
      : e
  );
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000);
logger.info('Servidor escuchando en el puerto 3000');
