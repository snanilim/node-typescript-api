import { createServer, Server } from 'http';
import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { AppConfig } from './app-config';
import { MainRouter } from './main.router';
import { Logger } from '../../helper';
import {
    validatePath,
    isEmpty,
    isConstructor,
    isFunction,
  } from '../../helper/utils/shared.utils';

export class App {
    private readonly app: express.Express;
    private readonly httpServer: Server;
    private readonly logger: Logger;

    constructor(
        private readonly config: AppConfig,
    ){
        this.logger = new Logger(App.name);
        this.app = express();
        this.httpServer = createServer(this.app);
    }

    helmet(){
        this.app.use(helmet());
    }

    morgan(){
        this.app.use(morgan('combined'));
        this.app.use(morgan('dev'));
    }

    cors(){
        this.app.use(cors());
    }

    modulesInitializer(routers: Array<any>): void{
        routers.forEach(router => {
            this.config.addRouter(router);
        });
    }

    async registerRouter(){
        const routers = this.config.getRouter();
        routers.forEach((router: MainRouter) => {
            const path = '/' + router.prefix;
            this.app.use(path, router.router);
            this.logger.log(`Configer route ${path}`);
        });
    }

    async init(): Promise<this>{
        await this.registerRouter();

        this.app.use((err, req, res, next) => {
            console.log('found error -----------');
        });

        this.app.use((req, res, next) => {
            console.log('not found 2');
        });

        return this;
    }

    async listen(port?: number, ...args) {
        await this.init();
        port = 3000;

        await this.listenAsync(port, args);
        this.logger.log('server start at port 3000');

        return this.httpServer;
    }

    protected async listenAsync(port?: number, ...args) {
        return new Promise(resolve => {
            const server = this.httpServer.listen(port, ...args, () => resolve(server));
        });
    }
}