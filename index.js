const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Diego", "email": "diego@rocketseat.com.br" }

// CRUD - Create, Read, Update, Delete

const users = ['Leonardo', 'Cláudio', 'Victor'];

// Midleware de Log
server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método; ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('Request');
});

// Midleware de verificação do usuário
function chekUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required.' });
  }

  return next();
};

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: 'User does not exists '});
  }

  req.user = user;

  return next();
};

// Rota para consulta de todos os usuários
server.get('/users', (req, res) => {
  return res.json(users);
});

// Rota para consulta de um único usuário, através do index
server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
});

// Rota para cadastro de um usuário
server.post('/users', chekUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Rota para edição de um usuário, através do index
server.put('/users/:index', checkUserInArray, chekUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// Rota de remoção de um usuário, através do index usando .splice()
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  
  users.splice(index, 1);

  return res.send();
});

server.listen(3000);