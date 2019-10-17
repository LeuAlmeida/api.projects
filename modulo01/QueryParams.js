const express = require('express');

const server = express();

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Diego", "email": "diego@rocketseat.com.br" }

server.get('/users', (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}`});
})

server.listen(3000);