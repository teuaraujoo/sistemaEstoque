const express = require('express');
const authControllers = require('../controllers/authControllers');
const authToken = require('../middlewares/authMiddlewares');
const router = express.Router();

// router.post('/registrar', authControllers.create);
router.post('/login', authControllers.login);
router.post('/protegida', authToken, (req, res) => {
    return res.json({message: 'ROTA PROTEGIDA'});

});

module.exports = router;