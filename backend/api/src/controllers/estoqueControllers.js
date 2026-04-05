const estoqueServices = require('../services/estoqueServices');

exports.getAllMoveEstoque = async (req, res) => {

    try {
        const data = await estoqueServices.getAllMoveEstoque();
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).send('Error ao buscar movimentações.');
    }

};

exports.createMoveEstoque = async (req, res) => {

    const body = req.body;
    try {
        const move = await estoqueServices.createMoveEstoque(body);
        return res.status(201).json({
            message: 'Movimentação cadastrada com sucesso!',
            data: move
        });
    } catch (err) {
        return res.status(500).send(err.message);
    };
};

exports.deleteMoveEstoque = async (req, res) => {

    try {
        return res.status(200).json({ message: 'Correções de estoque devem ser feitas por meio de nova movimentação compensatória' });
    } catch (err) {
        return res.status(500).send(err.message);
    };
};