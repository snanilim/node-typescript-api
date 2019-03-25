import { MainRouter } from './main.router';
import { isConstructor } from '../../helper/utils/shared.utils';
export class AppConfig {
    private routers: any[] = [];

    addRouter(router: any): void {
        this.routers.push(router);
    }

    getRouter(): any[]{
        return this.routers;
    }
}