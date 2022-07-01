const express = require('express');

const bodyParser = require('body-parser');

const ProductController = require('./controllers/ProductController');

const validation = require('./middlewares/ProductMiddleware');

const app = express();


app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Requisito 1
app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getById);

// Requisito 3 e 4
app.post('/products', validation.validation, ProductController.create);

// Requisito 6
app.get('/sales', ProductController.getAll);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;