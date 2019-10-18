const express = require('express')
const server = express();

server.use(express.json());

let numberOfRequests = 0;
const projects = [];

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// MIDDLEWARES /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function checkUserId(req, res, next) {
  const { id } = req.params;
  const project = projects.find(proj => proj.id == id);

  if (!project) {
    return res.status(400).json({ error: 'This project does not exist.'})
  }

  return next();
}

function logReq(req, res, next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

server.use(logReq);

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// ROUTES ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({id, title, tasks});

  return res.json(projects)
});


server.get('/projects', (req, res) => {
  return res.json(projects)
});


server.put('/projects/:id', checkUserId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id == id);

  project.title = title;

  return res.json(project);
});


server.delete('/projects/:id', checkUserId, (req, res) => {
  const { id } = req.params;
  
  const projectIndex = projects.findIndex(proj => proj.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});


server.post('/projects/:id/tasks', checkUserId, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const project = projects.find(proj => proj.id == id);

  project.tasks.push(tasks);

  return res.json(projects);

});


server.listen(3000);

///////////////////////////////////////  MÉTODOS HTTP  ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// [X] POST /projects: 
//A rota deve receber id e title dentro do corpo 
//e cadastrar um novo projeto dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }; 
// Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.
//////////////////////////////////////////////////////////////////////////////////////////////////
// [X] GET /projects: Rota que lista todos projetos e suas tarefas;
//////////////////////////////////////////////////////////////////////////////////////////////////
// [X] PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;
//////////////////////////////////////////////////////////////////////////////////////////////////
// [X] DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;
//////////////////////////////////////////////////////////////////////////////////////////////////
// [X] POST /projects/:id/tasks: A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;


////////////////////////////////////////  EXEMPLO  ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Se eu chamar a rota POST /projects repassando { id: 1, title: 'Novo projeto' } e a rota POST /projects/1/tasks com { title: 'Nova tarefa' }, meu array de projetos deve ficar assim:
//
// [
//   {
//     id: "1",
//     title: "Novo projeto",
//     tasks: ["Nova tarefa"]
//   }
// ];


//////////////////////////////////////  MIDDLEWARES  /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// [X] Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL que verifica se o projeto com aquele ID existe. Se não existir retorne um erro, caso contrário permita a requisição continuar normalmente;
//
// [X] Crie um middleware global chamado em todas requisições que imprime (console.log) uma contagem de quantas requisições foram feitas na aplicação até então;
