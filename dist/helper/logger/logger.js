"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color = require("colors");
let prevTime = Number(new Date());
let isLogCall = false;
class Logger {
    constructor(context) {
        this.context = context;
        this.isLogCall = false;
        this.prevTime = 0;
    }
    log(message, context) {
        const { logger } = Logger;
        logger && logger.log.call(logger, message, context || this.context);
    }
    error(message, context) {
        const { logger } = Logger;
        logger && logger.error.call(logger, message, context || this.context);
    }
    static log(message, context) {
        this.printmessage('log', message, context);
    }
    static error(message, context) {
        this.printmessage('error', message, context);
    }
    static timeCalculation() {
        if (!isLogCall) {
            isLogCall = true;
            prevTime = Number(new Date());
        }
        const timeNow = Number(new Date());
        return timeNow - prevTime;
    }
    static printmessage(title, message, context) {
        let msgColor = color.white;
        let titleColor = color.green;
        if (context === undefined)
            context = '---';
        if (title === 'error')
            (msgColor = color.red), (titleColor = color.red);
        const timeMS = `+${this.timeCalculation()}ms`;
        process.stdout.write(`${titleColor(title)}: `);
        process.stdout.write(`${color.magenta(context)} `);
        process.stdout.write(`${color.gray(new Date(Date.now()).toLocaleTimeString())} `);
        process.stdout.write(`${msgColor(message)}  `);
        process.stdout.write(`${color.magenta(timeMS)}  `);
        process.stdout.write('\n');
    }
}
Logger.logger = Logger;
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map