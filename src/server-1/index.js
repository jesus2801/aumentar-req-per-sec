const express = require('express');
const { waitCustomTime, getUsers } = require('../functions');

const app = express();

app.get('/users', async (req, res) => {
  console.log('petición en: /users');
  const users = getUsers();
  console.log('respuesta enviada');
  res.status(200).send(users);

  await waitCustomTime(300);
  await waitCustomTime(600);
  await waitCustomTime(900);
  console.log('Reportes hechos');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000);
console.log('Servidor escuchando en el puerto 3000');
