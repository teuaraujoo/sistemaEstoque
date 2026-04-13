require('dotenv').config({
    path: process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.development'
});
const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./src/routes/produtoRoutes');
const vendasRoutes = require('./src/routes/vendasRoutes');
const estoqueRoutes = require('./src/routes/estoqueRoutes');
const authRoutes = require('./src/routes/authRoutes');
const app = express();
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "https://sistema-estoque-one.vercel.app",
];

console.log(allowedOrigins.includes('http://localhost:5173'))

const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

app.use(cors(corsOptions));

// ROTAS
app.use('/api/v1/usuario', authRoutes);
app.use('/api/v1/produtos', produtoRoutes);
app.use('/api/v1/vendas', vendasRoutes);
app.use('/api/v1/estoque', estoqueRoutes);

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});