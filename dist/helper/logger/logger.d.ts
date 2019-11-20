export interface LoggerInterface {
    log(message: any, context?: string): any;
    error(message: any, context?: string): any;
}
export declare class Logger implements LoggerInterface {
    private readonly context;
    private static logger?;
    prevTime: number;
    isLogCall: boolean;
    constructor(context: string);
    log(message: any, context?: string): void;
    error(message: any, context?: string): void;
    static log(message: any, context?: string): void;
    static error(message: any, context?: string): void;
    private static timeCalculation;
    private static printmessage;
}
