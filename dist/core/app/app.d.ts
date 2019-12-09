/// <reference types="node" />
import { Server } from 'http';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { AppConfig } from './app-config';
export declare class App {
    private readonly config;
    private readonly app;
    private readonly httpServer;
    private readonly logger;
    constructor(config: AppConfig);
    bodyParser(): void;
    helmet(options: helmet.IHelmetConfiguration): void;
    morgan(): void;
    cors(options?: cors.CorsOptions): void;
    compression(): void;
    apiPrefix(prefix: string): void;
    modulesInitializer(routers: Array<any>): void;
    registerRouter(): Promise<void>;
    swagger(): void;
    init(): Promise<this>;
    listen(port?: number, ...args: any[]): Promise<Server>;
    protected listenAsync(port?: number, ...args: any[]): Promise<unknown>;
}
