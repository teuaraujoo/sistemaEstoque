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

router.post('/criar', vendasControllers.createVenda);

router.put('/atualizar/:id', vendasControllers.updateVenda);

router.delete('/deletar/:id', vendasControllers.deleteVenda);

module.exports = router;