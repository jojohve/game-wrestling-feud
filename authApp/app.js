const express = require('express');
const path = require('path'); // Importa il modulo path
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth'); // Assicurati che il percorso sia corretto

app.use(express.json());
app.use('/auth', authRoutes); // Usa le route di autenticazione

// Middleware per servire file statici
app.use(express.static(path.join(__dirname, 'public'))); // Assicurati di avere una cartella "public" se utilizzi questa linea

// Imposta il percorso della tua pagina HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Cambia qui per il percorso del tuo index.html
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});