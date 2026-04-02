const vendasServices = require('../services/vendasServices');

exports.getAllVendas = async (req, res) => {

    try {
        const data = await vendasServices.getAllVendas();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).send('Error ao buscar venda.');
    }
};

exports.getReceitaMes = async (req, res) => {
    try {
        const data = await vendasServices.getReceitaMes();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).send('Error ao buscar receita.');
    }
};

exports.getVendasMes = async (req, res) => {
    try {
        const data = await vendasServices.getVendasMes();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).send('Error ao buscar vendas do mês.');
    }
};

exports.getAllVendaItens = async (req, res) => {

    try {

        const data = await vendasServices.getAllVendaItens();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).send('Error ao buscar venda.');
    };
};

exports.getAllVendaItensByVendaId = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await vendasServices.getAllVendaItensByVendaId(id);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).send('Error ao buscar itens da venda.');
    };
};

exports.createVenda = async (req, res) => {

    const data = req.body;
    try {
        const venda = await vendasServices.createVenda(data);
        return res.status(201).json({
            message: 'Venda criada com sucesso!',
            data: venda // ID e VALOR_TOTAL da VENDA
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message);
    }
};

exports.deleteVenda = async (req, res) => {

    try {
        const id = req.params.id;
        await vendasServices.deleteVenda(id);
        return res.status(200).json({ message: 'Venda deletada com sucesso!' });
    } catch (err) {
        return res.status(500).send('Error ao deletar venda!');
    };
};