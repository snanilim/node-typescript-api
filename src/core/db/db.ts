import mongoose from 'mongoose';
import config from 'config';
import { Winston } from '../../helper';
import { promises } from 'fs';

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

export const connect = () => {
    console.log('config', config.get('mongo_uri'));
    mongoose.connect(config.get('mongo_uri'), {
        keepAlive: 1,
        useNewUrlParser: true,
    });
    return mongoose.connection;
}
// export default connect;
