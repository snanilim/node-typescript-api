import { Router } from 'express';
import {
  isString,
  validatePath,
  isFunction,
} from '../../helper/utils/shared.utils';
import { Subscriber } from 'rxjs';

export abstract class Controller {
  readonly prefix: string;
  readonly router: Router;

  constructor(name?: string | any) {
    this.prefix = this.buildRouterName(name);
    this.router = Router();
    this.onInit();
  }

  private buildRouterName(name?: string): string {
    name =
      name && isString(name)
        ? name
        : this.constructor.name.replace(/controller/gi, '');
    if (name) return validatePath(name.toLocaleLowerCase());
    return;
  }

  abstract onInit(): void;

}
