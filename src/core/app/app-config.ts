import { Controller } from './main.router';
import { isConstructor } from '../../helper/utils/shared.utils';
export class AppConfig {
    private routers: any[] = [];
    private readonly controllers: any[] = [];

    addController(controller: any): void {
        if (controller instanceof Controller) {
          this.controllers.push(controller);
          return;
        }
        if (isConstructor(controller)) {
          this.controllers.push(new controller());
          return;
        }
        return;
      }

    // addRouter(router: any): void {
    //     this.routers.push(router);
    // }

    getController(): any[]{
        return this.controllers;
    }
}