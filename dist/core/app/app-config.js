"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppConfig {
    constructor() {
        this.routers = [];
    }
    addRouter(router) {
        this.routers.push(router);
    }
    getRouter() {
        return this.routers;
    }
}
exports.AppConfig = AppConfig;
//# sourceMappingURL=app-config.js.map