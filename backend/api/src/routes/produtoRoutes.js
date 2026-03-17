const express = require('express');
const produtosControllers = require('../controllers/produtosController');
const router = express.Router();


router.get('/', produtosControllers.getAllProdutos);

router.get('/:id', produtosControllers.getProdutoById);

router.post('/criar', produtosControllers.createProduto);

router.put('/atualizar/:id', produtosControllers.updateProduto);

router.delete('/deletar/:id', produtosControllers.deleteProduto);

module.exports = router;