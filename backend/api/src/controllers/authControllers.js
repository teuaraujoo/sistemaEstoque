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
        const user = await authServices.login(req.body);
        return res.status(200).json({ message: 'Login realizado com sucesso!', data: user });
    } catch (err) {
        return res.status(401).json(err.message);
    };
};

exports.getAll = async (req, res) => {
    try {

    } catch (err) {

    }
}