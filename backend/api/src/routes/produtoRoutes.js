const express = require('express');
const produtosControllers = require('../controllers/produtosControllers');
const router = express.Router();

/* 

CRUD PRODUTOS 

1. READ
2. CREATE
3. UPDATE
4. DELETE

*/

router.get('/', produtosControllers.getAllProdutos);

router.get('/total', produtosControllers.getTotalProdutos);

router.get('/estoqueMin', produtosControllers.getAllProdutosLowEstoque);

router.get('/:id', produtosControllers.getProdutoById);

router.post('/', produtosControllers.createProduto);

router.patch('/:id/status', produtosControllers.activateProduto);

router.delete('/:id', produtosControllers.deleteProduto);

module.exports = router;