const express = require('express');
const authControllers = require('../controllers/authControllers');
const authToken = require('../middlewares/authMiddlewares');
const router = express.Router();

router.post('/', authControllers.create);
router.post('/login', authControllers.login);
router.get('/', authToken, authControllers.getAll);

module.exports = router;