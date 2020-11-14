import express from 'express';
import {json} from 'body-parser';
import {recordControllerV1} from './controllers/v1/Record.controller';
import {connectDatabase} from './utils/DatabaseConnection';
import morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import rateLimit from 'express-rate-limit'

const app = express();

app.use(json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//  Apply to all requests
app.use(limiter);

// Logger
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}));

// Database connection
connectDatabase();

app.use('/api/v1', recordControllerV1);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT ${process.env.PORT}`);
});
