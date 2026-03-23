const vendasServices = require('../services/vendasServices');

exports.getAllVendas = async(req, res) => {

    try {
        const data = await vendasServices.getAllVendas();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).send('Error ao buscar venda.');
    }
};

exports.createVenda = async (req, res) => {
    
    const data = req.body;
    try {
        const venda = await vendasServices.createVenda(data);
        return res.status(201).json({ 
            message: 'Venda criada com sucesso!',
            data: venda // ID e VALOR_TOTAL da VENDA
         });
    } catch(err) {
        console.log(err)
        return res.status(500).send(err.message);
    }
};

exports.deleteVenda = async (req, res) => {

    try {
        const id = req.params.id;
        const del = await vendasServices.deleteVenda(id);
        return res.status(200).json({ message: 'Venda deletado com sucesso!' });
    } catch(err) {
        return res.status(500).send('Error ao deletar venda!');
    };
};