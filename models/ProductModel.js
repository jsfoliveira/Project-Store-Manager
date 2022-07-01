const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');

    return products;
};

const getById = async (id) => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);
  // o id não pode ser vazio
  if (products.length === 0) return null;

  return products;
};

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [products] = await connection.execute(query, [name]);
  // Obtemos o resultado da inserção e o utilizamos para obter o ID recém inserido
  const newProduct = {
    id: products.insertId,
    name,
  };

  return newProduct;
};

module.exports = {
  getAll,
  getById,
  create,
};