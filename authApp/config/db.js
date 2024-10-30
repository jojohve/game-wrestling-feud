const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connesso a MongoDB');
    } catch (error) {
        console.error('Errore di connessione a MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectDB;