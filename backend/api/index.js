require('dotenv').config();
const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./src/routes/produtoRoutes');
const vendasRoutes = require('./src/routes/vendasRoutes');
const estoqueRoutes = require('./src/routes/estoqueRoutes');
const authRoutes = require('./src/routes/authRoutes');
const app = express();

app.use(express.json());
app.use(cors());

// ROTAS
app.use('/api/v1/usuario', authRoutes);
app.use('/api/v1/produtos', produtoRoutes);
app.use('/api/v1/vendas', vendasRoutes);
app.use('/api/v1/estoque', estoqueRoutes);

const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'API online'
    });
});

app.get('/db-check', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 AS ok');
        res.json({ ok: true, rows });
    } catch (error) {
        console.error('db-check error:', error);
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
    console.log({
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME,
        PORT: process.env.PORT,
        HAS_DB_PASSWORD: Boolean(process.env.DB_PASSWORD)
    });
});