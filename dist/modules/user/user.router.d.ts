import { MainRouter } from "../../core/app/router";
export declare class UserRouter extends MainRouter {
    constructor();
    get(req: any, res: any): Promise<void>;
    post(req: any, res: any): Promise<any>;
    onInit(): void;
}
