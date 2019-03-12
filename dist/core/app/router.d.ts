import { Router } from 'express';
export declare abstract class MainRouter {
    readonly prefix: String;
    readonly router: Router;
    constructor();
    private buildRouterName;
    abstract onInit(): void;
}
