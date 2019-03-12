import {Router} from 'express';

export abstract class MainRouter {
    readonly prefix: String;
    readonly router: Router;

    constructor(name:string){
        this.prefix = this.buildRouterName(name);
        this.router = Router();
        this.onInit();
    }

    private buildRouterName(name:string):string{
        console.log('call buildRouterName');
        return name;
    }

    abstract onInit():void;
}