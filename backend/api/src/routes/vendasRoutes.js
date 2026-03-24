const express = require('express');
const vendasControllers = require('../controllers/vendasControllers');
const router = express.Router();

/* 
CRUD VENDAS

1. READ
2. CREATE
3. UPDATE
4. DELETE

*/

router.get('/', vendasControllers.getAllVendas);
router.get('/itens', vendasControllers.getAllVendaItens);

router.post('/', vendasControllers.createVenda);

router.delete('/:id', vendasControllers.deleteVenda);

module.exports = router;