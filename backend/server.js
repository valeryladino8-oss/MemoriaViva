
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const bcrypt = require('bcryptjs');
// const db = require('./db'); 

// const app = express();

// // --- CONFIGURACIÓN PARA ARCHIVOS EN LA RAÍZ ---
// // '../' significa: "sal de servidor_memoriaviva y busca en la raíz"
// app.use(express.static(path.join(__dirname, '../'))); 

// app.use(cors());
// app.use(express.json());

// // --- RUTA DE REGISTRO ---
// app.post('/registrar', async (req, res) => {
//     const { email, password, first_name, last_name, phone, Occupation } = req.body;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const sql = 'INSERT INTO usuarios (email, password, nombre, apellido, telefono, ocupacion) VALUES (?, ?, ?, ?, ?, ?)';
    
//     db.query(sql, [email, hashedPassword, first_name, last_name, phone, Occupation], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ mensaje: "Error al guardar en la base de datos" });
//         }
//         res.status(201).json({ mensaje: "Usuario guardado con éxito" });
//     });
// });

// // --- EL PUERTO Y EL LINK AZUL ---
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`URL: http://localhost:${PORT}`);

// });

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