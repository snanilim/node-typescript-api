"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppConfig {
    constructor() {
        this.routers = [];
    }
    setRouter(router) {
        this.routers.push(router);
    }
    getRouter() {
        return this.routers;
    }
    setApiPrefix(prefix) {
        this.apiPrefix = prefix;
    }
    getApiPrefix() {
        return this.apiPrefix;
    }
}
exports.AppConfig = AppConfig;
//# sourceMappingURL=app-config.js.map