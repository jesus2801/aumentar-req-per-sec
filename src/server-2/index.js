const express = require('express');
const { waitCustomTime, getUsers } = require('../functions');
const logger = require('../logger');

const app = express();

app.get('/users', async (req, res) => {
  logger.info('petición en: /users');
  const users = getUsers();
  res.status(200).send(users);

  await waitCustomTime(300);
  await waitCustomTime(600);
  await waitCustomTime(900);
  logger.info('Reportes hechos');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000);
logger.info('Servidor escuchando en el puerto 3000');
