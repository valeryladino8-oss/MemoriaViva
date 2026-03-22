const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

// REGISTRO
router.post('/registrar', async (req, res) => {
    const { email, password,nombre, apellido, telefono, ocupacion} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = 'INSERT INTO usuarios (email, password, nombre, apellido, telefono, ocupacion) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [email, hashedPassword, nombre, apellido, telefono, ocupacion], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: "Error en la base de datos" });
        }
        res.status(201).json({ mensaje: "Usuario registrado correctamente" });
    });
});

module.exports = router;