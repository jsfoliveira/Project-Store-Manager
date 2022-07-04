const express = require('express');

const bodyParser = require('body-parser');

const ProductController = require('./controllers/ProductController');
const SalesController = require('./controllers/SalesController');

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

// Requisito 8
app.get('/sales', SalesController.getAllSales);
app.get('/sales/:id', SalesController.getByIdSales);

//Requisito 10
app.put('/products/:id', validation.validation, ProductController.updatedProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;