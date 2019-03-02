import { createServer, Server } from 'http';
import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { AppConfig } from './app-config';
import { MainRouter } from './router';


export class App{
    private readonly app: express.Express;
    private readonly httpServer: Server;
    constructor(
        private readonly config: AppConfig,
    ){
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
        // this.logger.log(`Application listening to: ${port}`);

        return this.httpServer;
    }

    protected async listenAsync(port?: number, ...args) {
        // console.log('...args', ...args);
        return new Promise(resolve => {
            const server = this.httpServer.listen(port, ...args, () => resolve(server));
        });
    }
}