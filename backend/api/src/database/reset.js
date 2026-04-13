const db  = require('./db');

async function reset() {

    try {

        await db.query('SET FOREIGN_KEY_CHECKS = 0');
        
        await db.query('TRUNCATE TABLE MOVE_ESTOQUE');
        await db.query('TRUNCATE TABLE VENDA_ITENS');
        await db.query('TRUNCATE TABLE VENDAS');
        await db.query('TRUNCATE TABLE PRODUTOS');
        
        await db.query('SET FOREIGN_KEY_CHECKS = 1');
        
        console.log('Banco resetado com sucesso!');
    } catch (err) {
        console.log('Error reset: ', err);
    } finally {
        process.exit();
    };
};

reset();