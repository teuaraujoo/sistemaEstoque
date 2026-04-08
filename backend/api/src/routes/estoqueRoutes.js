const express = require('express');
const estoqueControllers = require('../controllers/estoqueControllers');
const authToken = require('../middlewares/authMiddlewares');
const router = express.Router();

router.get('/', authToken, estoqueControllers.getAllMoveEstoque);
router.post('/', authToken, estoqueControllers.createMoveEstoque);
router.delete('/:id', authToken, estoqueControllers.deleteMoveEstoque);

module.exports = router;
