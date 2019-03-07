import * as color from 'colors';

export interface LoggerInterface {
    log(message: any, context?: string);
}

export class Logger implements LoggerInterface{
    private static logger?: typeof Logger | LoggerInterface = Logger;

    constructor(
        private readonly context: string,
    ) { }

    log(message: any, context?: string){
        const { logger } = Logger;
        logger && logger.log.call(logger, message, context || this.context);
    }

    static log(message: any, context?: string): void{
        this.printmessage('log', message, context);
    }

    private static printmessage(title:string, message:any, context?:string): void{
        if(context === undefined){
            context = '---';
        }
        process.stdout.write(`${color.green(title)}: `);
        process.stdout.write(`${color.magenta(context)} `);
        process.stdout.write(`${color.gray(new Date(Date.now()).toLocaleTimeString())}  `);
        process.stdout.write(`${message}   `);
        process.stdout.write('\n');
  
    }
} 