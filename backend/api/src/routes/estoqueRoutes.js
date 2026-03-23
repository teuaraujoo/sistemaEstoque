const express = require('express');
const estoqueControllers = require('../controllers/estoqueControllers');
const router = express.Router();

router.get('/', estoqueControllers.getAllMoveEstoque);

router.post('/', estoqueControllers.createMoveEstoque);

router.delete('/:id', estoqueControllers.deleteMoveEstoque);

module.exports = router;
