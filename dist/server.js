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
require("reflect-metadata");
const core_1 = require("./core");
const config_1 = require("./config");
const app_config_1 = require("./core/app/app-config");
const routes_1 = require("./modules/routes");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield core_1.dbInitializer(Object.assign({}, config_1.dbConfig, { entities: [__dirname + '/**/*.entity{.ts,.js}'] }));
        const app = new core_1.App(new app_config_1.AppConfig);
        app.helmet();
        app.morgan();
        app.cors();
        app.modulesInitializer(routes_1.default);
        yield app.listen();
    });
}
bootstrap();
//# sourceMappingURL=server.js.map