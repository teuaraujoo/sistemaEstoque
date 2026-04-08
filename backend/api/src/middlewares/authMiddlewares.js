const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não informado' });
    };

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Token mal informado' });
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