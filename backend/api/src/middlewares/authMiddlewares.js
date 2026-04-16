const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Token não informado' });
    };

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    };
};

module.exports = authToken;