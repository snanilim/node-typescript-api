import { createServer, Server } from 'http';
import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { AppConfig } from './app-config';
import { MainRouter } from './router';
import { Logger } from '../helper/logger/logger';
const path = require('path');
const log = require('debug')(`log: ${path.basename(__filename)}`);

export class App{
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
    initRouters(routers: Array<any>):void{
        routers.forEach(router => {
            this.config.addRouter(router);
        })
    }

    async registerRoute(){
        console.log('registerRoute');
        const routers = this.config.getRouter();
        routers.forEach((router:MainRouter) => {
            const path = '/' + router.prefix;
            console.log('path', path);
            this.app.use(path, router.router);
            this.logger.log(`Configer route ${path}`);
        })
    }

    async init(): Promise<this>{
        await this.registerRoute();

        this.app.use((req, res, next) => {
            console.log('not found');
        });

        return this;
    }

    async listen(port?: number, ...args) {
        await this.init();
        // console.log(await this.init());
        port = 3000;

        await this.listenAsync(port, args);
        log('Server start on port %o', `3000`);
        this.logger.log('server start at port 3000');

        return this.httpServer;
    }

    protected async listenAsync(port?: number, ...args) {
        // console.log('...args', ...args);
        return new Promise(resolve => {
            const server = this.httpServer.listen(port, ...args, () => resolve(server));
        });
    }
}