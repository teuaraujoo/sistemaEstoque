const produtoServices = require('../services/produtosServices');

exports.getAllProdutos = async (req, res) => {

    try {
        const data = await produtoServices.getAllProdutos();
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error ao buscar produtos.');
    };
};

exports.getProdutoById = async (req, res) => {

    const id = req.params.id;

    try {
        const data = await produtoServices.getProdutoById(id);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).send('Error ao buscar produto.');
    };
};

exports.createProduto = async (req, res) => {

    const data = req.body;

    try {
        const create = await produtoServices.createProduto(data);
        return res.status(201).send({
            message: "Produto cadastrado com sucesso!",
            data: create
        });
    } catch (err) {
        return res.status(500).send(err.message);
    };
};

exports.updateProduto = async (req, res) => {

    const data = req.body;
    const id = req.params.id;

    try {
        const produtoUpdate = await produtoServices.updateProduto(data, id);
        return res.status(200).json({
            message: 'Produto atualizado com sucesso!',
            data: produtoUpdate
        });
    } catch (err) {
        return res.status(500).send(err.message);
    };
};

exports.deleteProduto = async (req, res) => {

    const id = req.params.id;
    try {
        const produtoDel = await  produtoServices.inactiveStatus(id);
        return res.status(200).json({ message: 'Status modificado com sucesso!' });
    } catch (err) { 
        console.log(err)
        return res.status(500).send(err.message);
    };
};
