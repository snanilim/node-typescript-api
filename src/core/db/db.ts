
import {ConnectionOptions, createConnection} from 'typeorm';

import * as mongoose from 'mongoose';
import * as config from 'config';
import { Winston } from '../../helper';
import { promises } from 'fs';

export const dbInitializer = () => {
    const value = config.get('mongo_uri');
    console.log('config', value);

    mongoose.connect(config.get('mongo_uri'), {
        keepAlive: 1,
        useNewUrlParser: true,
    });

    const winston = new Winston();
    const logger = winston.logger('db.ts');

    mongoose.connection.on('open', (ref) => {
        logger.info('Mongodb Connected Succesfully');
    });

    mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB Connection was faield: ${err.message}`);
        process.exit(-1);
    });

    if (config.util.getEnv('NODE_ENV') === 'development') {
        mongoose.set('debug', true);
    }
    return mongoose.connection;
};
