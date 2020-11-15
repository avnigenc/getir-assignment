import dotenv from 'dotenv';

dotenv.config();

import mongoose from 'mongoose';

let dbConnection: mongoose.Connection;

export const connectDatabase = () => {
    const uri = '' + process.env.DB_URI;
    if (dbConnection) {
        return;
    }
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    dbConnection = mongoose.connection;
    dbConnection.once('open', async () => {
        console.log(`Connected to database ${process.env.DB_NAME}`);
    });
    dbConnection.on('error', () => {
        console.log(`Error connecting to database ${process.env.DB_NAME}`);
    });
};

export const disconnectDatabase = () => {
    if (!dbConnection) {
        return;
    }
    mongoose.disconnect();
};
