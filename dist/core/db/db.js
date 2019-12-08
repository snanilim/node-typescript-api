"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config = require("config");
const helper_1 = require("../../helper");
exports.dbInitializer = () => {
    const db = mongoose.connection;
    const winstonInit = new helper_1.Winston();
    const winston = winstonInit.logger('db.ts');
    const mongo_uri = config.get('mongo_uri');
    const logger = new helper_1.Logger('DB');
    mongoose.connect(mongo_uri, { keepAlive: 1, useNewUrlParser: true });
    db.on('open', () => {
        winston.info('Mongodb Connected Succesfully');
    });
    db.on('error', (error) => {
        winston.error(`MongoDB Connection was faield: ${error.message}`);
        logger.error(`MongoDB Connection was faield: ${error.message}`);
        process.exit(-1);
    });
    if (config.util.getEnv('NODE_ENV') === 'development')
        mongoose.set('debug', true);
    return db;
};
//# sourceMappingURL=db.js.map