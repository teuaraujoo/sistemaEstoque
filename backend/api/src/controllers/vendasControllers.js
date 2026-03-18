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
    
    const body = req.body;
    try {
        const create = await vendasServices.createVenda(body);
        return res.status(201).json({ 
            message: 'Venda criada com sucesso!',
            venda: create
         });
    } catch(err) {
        console.log(err)
        return res.status(500).send(err.message);
    }
};

exports.updateVenda = async (req, res) => {

    const body = req.body;
    const id = req.params.id;
    try {
        const update = await vendasServices.updateVenda(body, id);
        return res.status(200).json({ 
            message: 'Venda atualizada com sucesso!',
            venda: update
        });
    } catch(err) {
        return res.status(500).send(err.message);
    };
};  

exports.deleteVenda = async (req, res) => {

    try {
        const id = req.params.id;
        const del = await vendasServices.deleteVenda(id);
        return res.status(200).json({ 
            message: 'Produto deletado com sucesso!',
            venda: del 
        });
    } catch(err) {
        return res.status(500).send('Error ao deletar venda!');
    };
};