"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class MainRouter {
    constructor() {
        this.prefix = this.buildRouterName();
        this.router = express_1.Router();
        this.onInit();
    }
    buildRouterName() {
        console.log('call buildRouterName');
        return 'user';
    }
}
exports.MainRouter = MainRouter;
//# sourceMappingURL=router.js.map