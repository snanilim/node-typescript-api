import {createServer, Server} from 'http';
import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import {AppConfig} from './app-config';
import {MainRouter} from './main.router';
import {Logger, notFound, errorHandler, validatePath} from '../../helper';

export class App {
  private readonly app: express.Express;
  private readonly httpServer: Server;
  private readonly logger: Logger;

  constructor(private readonly config: AppConfig) {
    this.logger = new Logger(App.name);
    this.app = express();
    this.httpServer = createServer(this.app);
  }

  bodyParser() {
    const parserList = {
      jsonParser: bodyParser.json(),
      urlencodedParser: bodyParser.urlencoded({extended: false})
    };
    Object.keys(parserList).forEach((parser) => {
      this.app.use(parserList[parser]);
    });
  }

  helmet(options: helmet.IHelmetConfiguration) {
    this.app.use(helmet(options));
  }

  morgan() {
    // this.app.use(morgan('combined'));
    // this.app.use(morgan('dev'));
    this.app.use(
      morgan(':method :url :status :res[content-length] - :response-time ms')
    );
  }

  cors(options?: cors.CorsOptions) {
    this.app.use(cors(options));
  }

  compression() {
    this.app.use(compression());
  }

  apiPrefix(prefix: string) {
    this.config.setApiPrefix(prefix);
  }

  modulesInitializer(routers: Array<any>): void {
    routers.forEach((router) => {
      this.config.setRouter(router);
    });
  }

  async registerRouter() {
    const routers = this.config.getRouter();
    const getPrefix = this.config.getApiPrefix();
    const apiPrefix = validatePath(getPrefix);
    routers.forEach((router: MainRouter) => {
      const path = apiPrefix + router.prefix;
      this.app.use(path, router.router);
      this.logger.log(`Configer service ${path}`);
    });
  }

  async init(): Promise<this> {
    await this.registerRouter();

    this.app.use(notFound);
    this.app.use(errorHandler);

    return this;
  }

  async listen(port?: number, ...args) {
    await this.init();
    port = port || 3100;

    await this.listenAsync(port, args);
    this.logger.log(`server start at port ${port}`);

    return this.httpServer;
  }

  protected async listenAsync(port?: number, ...args) {
    return new Promise((resolve) => {
      const server = this.httpServer.listen(port, ...args, () =>
        resolve(server)
      );
    });
  }
}
