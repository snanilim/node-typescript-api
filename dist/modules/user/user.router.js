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
const router_1 = require("../../core/app/router");
const user_entity_1 = require("./user.entity");
class UserRouter extends router_1.MainRouter {
    constructor() {
        super();
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_entity_1.Users.find();
            res.json({ 'users': users });
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            user_entity_1.User.name = "Shah Noor Alam Nilim";
            user_entity_1.User.isPublic = true;
            yield user_entity_1.User.save();
            return res.json('user save successfully');
        });
    }
    onInit() {
        console.log('call onit');
        this.router.get('/', (req, res) => this.get(req, res));
        this.router.post('/', (req, res) => this.post(req, res));
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=user.router.js.map