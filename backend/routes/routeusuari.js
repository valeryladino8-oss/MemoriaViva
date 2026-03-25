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

//RUTA DE LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    
    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error en el servidor" });

        if (result.length === 0) {
            return res.status(401).json({ mensaje: "El correo no está registrado" });
        }

        const usuario = result[0];
        const coinciden = await bcrypt.compare(password, usuario.password);

        if (!coinciden) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        res.status(200).json({ 
            mensaje: "¡Bienvenido de nuevo!",
            nombre: usuario.nombre 
        });
    });
});

//RUTA DE CONSULTAR
router.get('/usuario/consultar/:email', (req, res) => {
    const email = req.params.email;
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(result[0]);
    });
});

//ACTUALIZAR CONTRASEÑA
router.patch('/usuario/actualizar-password/:email', async (req, res) => {
    const email = req.params.email;
    const { currentPass, newPass } = req.body;

    // 1. Buscamos al usuario para ver si la contraseña actual es correcta
    const sqlSelect = 'SELECT password FROM usuarios WHERE email = ?';
    
    db.query(sqlSelect, [email], async (err, result) => {
        if (err || result.length === 0) return res.status(500).json({ mensaje: "Usuario no encontrado" });

        // 2. Comparamos la contraseña actual con la de la DB
        const coinciden = await bcrypt.compare(currentPass, result[0].password);
        if (!coinciden) {
            return res.status(401).json({ mensaje: "La contraseña actual es incorrecta" });
        }

        // 3. Encriptamos la NUEVA contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPass, salt);

        // 4. Guardamos la nueva contraseña encriptada
        const sqlUpdate = 'UPDATE usuarios SET password = ? WHERE email = ?';
        db.query(sqlUpdate, [hashedNewPassword, email], (errUpdate, resUpdate) => {
            if (errUpdate) return res.status(500).json({ mensaje: "Error al actualizar" });
            res.status(200).json({ mensaje: "Contraseña cambiada correctamente" });
        });
    });
});


//RUTA DE ACTUALIZAR EN GENERAL
router.patch('/usuario/actualizar/:emailAntiguo', (req, res) => {
    const emailAntiguo = req.params.emailAntiguo;
    const { nombre, apellido, telefono, email, ocupacion} = req.body;

    const sql = 'UPDATE usuarios SET nombre=?, apellido=?, telefono=?, email=? ,ocupacion=? WHERE email=?';
    
    db.query(sql, [nombre, apellido, telefono, email, ocupacion, emailAntiguo], (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al actualizar" });
        res.status(200).json({ mensaje: "Usuario actualizado" });
    });
});

//RUTA DE ELIMINAR CUENTA 
router.delete('/usuario/eliminar/:email', (req, res) => {
    const email = req.params.email;
    const sql = 'DELETE FROM usuarios WHERE email = ?';
    
    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al eliminar" });
        res.status(200).json({ mensaje: "Cuenta eliminada" });
    });
});

module.exports = router;

