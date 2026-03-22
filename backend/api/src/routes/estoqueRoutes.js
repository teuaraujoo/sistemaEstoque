const express = require('express');
const estoqueControllers = require('../controllers/estoqueControllers');
const router = express.Router();

router.get('/', estoqueControllers.getAllMoveEstoque);

router.post('/criar', estoqueControllers.createMoveEstoque);

router.delete('/deletar/:id', estoqueControllers.deleteMoveEstoque);

module.exports = router;
