import * as mongoose from 'mongoose';
import * as config from 'config';
import { Winston } from '../../helper';

export const dbInitializer = () => {
    const db = mongoose.connection;
    const winston = new Winston();
    const logger = winston.logger('db.ts');
    const mongo_uri = config.get('mongo_uri');

    mongoose.connect(mongo_uri, { keepAlive: 1, useNewUrlParser: true, });

    db.on('open', (ref) => { logger.info('Mongodb Connected Succesfully'); });

    db.on('error', (error) => {
        // logger.error(`MongoDB Connection was faield: ${error.message}`);
        // process.exit(-1);
        throw error;
        // throw new Error(error);
    });

    if (config.util.getEnv('NODE_ENV') === 'development')
        mongoose.set('debug', true);

    return db;
};
