const express = require('express');
const produtosControllers = require('../controllers/produtosControllers');
const authToken = require('../middlewares/authMiddlewares');
const router = express.Router();

/* 
CRUD 

1. READ
2. CREATE
3. UPDATE
4. DELETE
*/

router.get('/', authToken, produtosControllers.getAllProdutos);

router.get('/total', authToken, produtosControllers.getTotalProdutos);

router.get('/estoqueMin', authToken, produtosControllers.getAllProdutosLowEstoque);

router.get('/:id', authToken, produtosControllers.getProdutoById);

router.post('/', authToken, produtosControllers.createProduto);

router.put('/:id', authToken, produtosControllers.updateProduto);

router.patch('/:id/status', authToken, produtosControllers.activateProduto);

router.delete('/:id', authToken, produtosControllers.deleteProduto);

module.exports = router;