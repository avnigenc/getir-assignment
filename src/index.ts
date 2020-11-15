import express from 'express';
import {json} from 'body-parser';
import {recordControllerV1} from './controllers/v1/Record.controller';
import {connectDatabase, disconnectDatabase} from './utils/DatabaseConnection';
import morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import rateLimit from 'express-rate-limit'
import cors from 'cors'

const app = express();

app.use(json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Apply to all requests
app.use(limiter);

// Setup CORS
app.use(cors());

// Logger
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}));

// Database connection
connectDatabase();

// Record V1 Controller
app.use('/api/v1', recordControllerV1);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT ${process.env.PORT}`);
});

process.on('SIGINT', () => killProcess("SIGINT"))
    .on('SIGTERM', () => killProcess("SIGTERM"))
    .on('SIGQUIT', () => killProcess("SIGQUIT"))
    .on('uncaughtException', (err) => {
        console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
        console.error(err.stack)
        process.exit(1);
    })
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    });

const killProcess = (signal: any) => {
    console.info(`${signal} signal received. Closing server...`);
    setTimeout(shutdownGracefully, 300);
}

const shutdownGracefully = () => {
    server.close((err: any) => {
        if (err) {
            console.error(err);
            process.exit(1); // failure
        }

        disconnectDatabase();
    })
}
