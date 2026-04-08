const express = require('express');
const vendasControllers = require('../controllers/vendasControllers');
const authToken = require('../middlewares/authMiddlewares');
const router = express.Router();

router.get('/', authToken, vendasControllers.getAllVendas);

router.get('/receitaMes', authToken, vendasControllers.getReceitaMes);

router.get('/vendasMes', authToken, vendasControllers.getVendasMes);

router.get('/itens', authToken, vendasControllers.getAllVendaItens);

router.get('/itens/:id', authToken, vendasControllers.getAllVendaItensByVendaId);

router.post('/', authToken, vendasControllers.createVenda);

router.delete('/:id', authToken, vendasControllers.deleteVenda);

module.exports = router;