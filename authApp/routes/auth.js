const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();
const { SECRET_KEY } = process.env;

// Genera un token JWT
const generateToken = (username) => jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

// Registrazione
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'Utente già registrato' });

        user = new User({ username, password });
        await user.save();
        const token = generateToken(username); // Genera un token dopo la registrazione
        res.status(201).json({ message: 'Registrazione completata', token });
    } catch (error) {
        console.error('Errore durante la registrazione:', error); // Stampa l'errore nel terminale
        res.status(500).json({ message: 'Errore del server' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }
        
        const token = generateToken(username);
        res.json({ token, redirect: '/home.html' });
    } catch (error) {
        res.status(500).json({ message: 'Errore del server' });
    }
});

// Aggiungi questa route al tuo file auth.js
router.get('/user', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Ottieni il token dalla richiesta
    if (!token) return res.status(401).json({ message: 'Accesso negato' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verifica il token
        const user = await User.findOne({ username: decoded.username }); // Trova l'utente nel DB
        if (!user) return res.status(404).json({ message: 'Utente non trovato' });

        // Invia i dati dell'utente
        res.json({
            username: user.username,
            createdAt: user.createdAt // Assumendo che tu abbia un campo `createdAt` nel tuo modello
        });
    } catch (error) {
        res.status(400).json({ message: 'Token non valido' });
    }
});

module.exports = router;