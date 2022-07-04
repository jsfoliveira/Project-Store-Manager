const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductModel = require('../../../models/ProductModel');

describe('Camada de Models - Products', () => {
    describe('Testando se tem produtos cadastrados na função "getAll"', () => {
      const products = [
        {
          id: 1,
          name: 'Martelo de Thor',
        },
      ];
      before(async () => {
        sinon.stub(connection, 'execute').resolves([products]);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna todos os produtos dentro de um array', async () => {
        const response = await ProductModel.getAll();
        expect(response).to.be.an('array');
      });
      it('Retorna todos os produtos', async () => {
        const response = await ProductModel.getAll();
        expect(response).to.be.equal(products)
      });
    });

    describe('Testando se não tem produtos cadastrados na função "getAll"', async () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna um objeto vazio', async () => {
        const response = await ProductModel.getAll();
        expect(response).to.be.empty;
      });
  });

    describe('Testando se consegue buscar apenas 1 produto no banco por seu ID na função "getById"', () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      describe('Quando não existe o produto com o ID informado na função "getById"', () => {
        it('Retorna null', async () => {
          const response = await ProductModel.getById();
          expect(response).to.be.equal(null);
        });
      });
      describe('Quando existe o produto com o ID informado na função "getById"', () => {
        before(async () => {
          sinon.stub(ProductModel, 'getById')
            .resolves(
              {
                id: 1,
                name: 'Martelo de Thor',
              },
            );
        });
        after(() => {
          ProductModel.getById.restore();
        });
        it('Retorna um objeto', async () => {
          const response = await ProductModel.getById(1);
          expect(response).to.be.an('object');
        });
        it('Não está vazio', async () => {
          const response = await ProductModel.getById(1);
          expect(response).to.be.not.empty;
        });
        it('Possui as propriedades"id" e "name"', async () => {
          const item = await ProductModel.getById(1);
          expect(item).to.include.all.keys('id', 'name');
        });
      });
    });
}); 