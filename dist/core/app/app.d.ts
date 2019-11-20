/// <reference types="node" />
import { Server } from 'http';
import { AppConfig } from './app-config';
export declare class App {
    private readonly config;
    private readonly app;
    private readonly httpServer;
    private readonly logger;
    constructor(config: AppConfig);
    bodyParser(): void;
    helmet(): void;
    morgan(): void;
    cors(): void;
    apiPrefix(prefix: string): void;
    modulesInitializer(routers: Array<any>): void;
    registerRouter(): Promise<void>;
    init(): Promise<this>;
    listen(port?: number, ...args: any[]): Promise<Server>;
    protected listenAsync(port?: number, ...args: any[]): Promise<{}>;
}
