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

app.listen(port, '0.0.0.0', () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
});