export interface LoggerInterface {
    log(message: any, context?: string): any;
}
export declare class Logger implements LoggerInterface {
    private readonly context;
    private static logger?;
    constructor(context: string);
    log(message: any, context?: string): void;
    static log(message: any, context?: string): void;
    private static printmessage;
}