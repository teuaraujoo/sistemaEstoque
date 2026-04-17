const authServices = require('../services/authServices');

exports.create = async (req, res) => {
    try {
        const user = await authServices.create(req.body);
        return res.status(200).json({ message: 'Usuario criado', user: user });
    } catch (err) {
        return res.status(401).json(err.message);
    };

};

exports.login = async (req, res) => {

    try {
        const result = await authServices.login(req.body);

        res.cookie('accessToken', result.token, {
            httpOnly: true, // impede scripts JS
            secure: process.env.NODE_ENV === 'production', // só permite que o cookie trafegue em HTTPS em produção
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 1000 * 60 * 300, // 5 horas
            path: '/'
        });

        return res.status(200).json({ message: 'Login realizado com sucesso!', data: result.user });
    } catch (err) {
        return res.status(401).json(err.message);
    };
};

exports.logout = async (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    });
    return res.json({ message: 'Logout realizado com sucesso!' });
};

exports.user = async (req, res) => {
    try {
        return res.status(200).json({ authenticated: true, user: req.user });
    } catch (err) {
        return res.status(401).json(err.message);
    };
}

exports.getAll = async (req, res) => {
    try {

    } catch (err) {

    }
}