"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color = require("colors");
class Logger {
    constructor(context) {
        this.context = context;
    }
    log(message, context) {
        const { logger } = Logger;
        logger && logger.log.call(logger, message, context || this.context);
    }
    static log(message, context) {
        this.printmessage('log', message, context);
    }
    static printmessage(title, message, context) {
        if (context === undefined) {
            context = '---';
        }
        process.stdout.write(`${color.green(title)}: `);
        process.stdout.write(`${color.magenta(context)} `);
        process.stdout.write(`${color.gray(new Date(Date.now()).toLocaleTimeString())}  `);
        process.stdout.write(`${message}   `);
        process.stdout.write('\n');
    }
}
Logger.logger = Logger;
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map