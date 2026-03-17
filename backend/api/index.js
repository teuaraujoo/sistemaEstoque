const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./src/routes/produtoRoutes');
const app = express();

app.use(express.json());
app.use(cors());

// ROTAS
app.use('/api/v1/produtos', produtoRoutes);

app.listen(8800, () => {
 console.log('SERVER IS RUNNING ON PORT 8800');
});