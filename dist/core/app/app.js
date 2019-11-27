"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const compression = require("compression");
const helper_1 = require("../../helper");
class App {
    constructor(config) {
        this.config = config;
        this.logger = new helper_1.Logger(App.name);
        this.app = express();
        this.httpServer = http_1.createServer(this.app);
    }
    bodyParser() {
        const parserList = {
            jsonParser: bodyParser.json(),
            urlencodedParser: bodyParser.urlencoded({ extended: false })
        };
        Object.keys(parserList).forEach((parser) => {
            this.app.use(parserList[parser]);
        });
    }
    helmet() {
        this.app.use(helmet());
    }
    morgan() {
        this.app.use(morgan('dev'));
    }
    cors() {
        this.app.use(cors());
    }
    compression() {
        this.app.use(compression());
    }
    apiPrefix(prefix) {
        this.config.setApiPrefix(prefix);
    }
    modulesInitializer(routers) {
        routers.forEach((router) => {
            this.config.setRouter(router);
        });
    }
    registerRouter() {
        return __awaiter(this, void 0, void 0, function* () {
            const routers = this.config.getRouter();
            const getPrefix = this.config.getApiPrefix();
            const apiPrefix = helper_1.validatePath(getPrefix);
            routers.forEach((router) => {
                const path = apiPrefix + router.prefix;
                this.app.use(path, router.router);
                this.logger.log(`Configer service ${path}`);
            });
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.registerRouter();
            this.app.use(helper_1.notFound);
            this.app.use(helper_1.errorHandler);
            return this;
        });
    }
    listen(port, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            port = 3000;
            yield this.listenAsync(port, args);
            this.logger.log('server start at port 3000');
            return this.httpServer;
        });
    }
    listenAsync(port, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const server = this.httpServer.listen(port, ...args, () => resolve(server));
            });
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map