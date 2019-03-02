import {Router} from 'express';

export abstract class MainRouter {
    readonly prefix: String;
    readonly router: Router;

    constructor(){
        this.prefix = this.buildRouterName();
        this.router = Router();
        this.onInit();
    }

    private buildRouterName():string{
        console.log('call buildRouterName');
        return 'user';
    }

    abstract onInit():void;
}