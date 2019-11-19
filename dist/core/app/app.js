"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const helper_1 = require("../../helper");
const path = require('path');
const log = require('debug')(`log: ${path.basename(__filename)}`);
class App {
    constructor(config) {
        this.config = config;
        this.logger = new helper_1.Logger(App.name);
        this.app = express();
        this.httpServer = http_1.createServer(this.app);
    }
    helmet() {
        this.app.use(helmet());
    }
    morgan() {
        this.app.use(morgan('combined'));
        this.app.use(morgan('dev'));
    }
    cors() {
        this.app.use(cors());
    }
    modulesInitializer(routers) {
        routers.forEach(router => {
            this.config.addRouter(router);
        });
    }
    registerRoute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('registerRoute');
            const routers = this.config.getRouter();
            routers.forEach((router) => {
                const path = '/' + router.prefix;
                console.log('path', path);
                this.app.use(path, router.router);
                this.logger.log(`Configer route ${path}`);
            });
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.registerRoute();
            this.app.use((req, res, next) => {
                console.log('not found');
            });
            return this;
        });
    }
    listen(port, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            port = 3000;
            yield this.listenAsync(port, args);
            log('Server start on port %o', `3000`);
            this.logger.log('server start at port 3000');
            return this.httpServer;
        });
    }
    listenAsync(port, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                const server = this.httpServer.listen(port, ...args, () => resolve(server));
            });
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map