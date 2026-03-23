

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// SERVIR FRONTEND
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use(express.json());

// RUTAS
const usuariosRoutes = require('./routes/routeusuari');
app.use('/api', usuariosRoutes);

// PUERTO
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`URL: http://localhost:${PORT}`);
});